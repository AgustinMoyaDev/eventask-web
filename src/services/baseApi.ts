import {
  createApi,
  fetchBaseQuery,
  QueryReturnValue,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react'

import { IAuthResponseDto } from '../types/dtos/auth'
import { HTTP_STATUS } from '../api/types/http-status'

import { RootState } from '../store/store'
import { setCredentials } from '../store/slices/auth/authSlice'
import { setCsrfToken } from '../store/slices/security/security'

import { getEnvVariables } from '../helpers/getEnvVariables'
import { ApiResponse } from '../api/types/response'

/**
 * Development logging utilities for auth flow
 */
const { DEV, VITE_API_URL } = getEnvVariables()

/**
 * Promise Deduplication Pattern (Single Flight Pattern)
 * Prevents multiple simultaneous refresh calls when multiple requests receive 401
 * Only the first request executes refresh, others wait for the same promise result
 * @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-duplicate-requests
 */
let refreshPromise: Promise<QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>> | null = null

/**
 * Promise Deduplication Pattern for logout operations
 * Prevents multiple simultaneous logout calls when refresh fails for multiple requests
 */
let logoutPromise: Promise<void> | null = null

/**
 * Check if the current request is an authentication endpoint
 * @param url - Request URL to check
 * @returns True if the URL is an authentication endpoint, false otherwise
 */
function isAuthPath(url?: string): boolean {
  const AUTH_PATHS = ['/auth/login', '/auth/refresh', '/auth/logout']
  return !!url && AUTH_PATHS.some(path => url.endsWith(path))
}

/**
 * Extract URL from RTK Query args for logging and validation
 * @param args - RTK Query request arguments
 * @returns Extracted URL string or empty string
 */
function extractUrl(args: string | FetchArgs): string {
  return typeof args !== 'string' && args.url ? args.url : ''
}

/**
 * Log refresh attempt with contextual information
 * @param url - The original request URL that triggered 401
 */
function logRefreshAttempt(url: string): void {
  if (DEV) console.log(`🔄 [baseQuery] 401 detected for ${url}, attempting refresh...`)
}

/**
 * Log refresh initiation or wait status
 * @param isNewRefresh - Whether this is a new refresh or waiting for existing one
 */
function logRefreshStatus(isNewRefresh: boolean): void {
  if (!DEV) return

  if (isNewRefresh) {
    console.log('🚀 [baseQuery] Initiating new refresh request')
  } else {
    console.log('⏳ [baseQuery] Waiting for existing refresh request')
  }
}

/**
 * Handle successful refresh by updating credentials and retrying original request
 * @param api - RTK Query API instance
 * @param refreshData - Fresh auth data from refresh endpoint
 * @param originalArgs - Original request arguments to retry
 * @param extraOptions - Additional options for the request
 * @returns Result of the retried original request
 */
async function handleRefreshSuccess(
  api: BaseQueryApi,
  refreshData: IAuthResponseDto,
  originalArgs: string | FetchArgs,
  extraOptions: Parameters<BaseQueryFn>[2]
) {
  if (DEV) console.log('✅ [baseQuery] Refresh successful, retrying original request')

  api.dispatch(
    setCredentials({
      accessToken: refreshData.accessToken,
      userId: refreshData.userId,
    })
  )

  return (await baseQuery(originalArgs, api, extraOptions)) as QueryReturnValue<
    ApiResponse,
    FetchBaseQueryError,
    object
  >
}

/**
 * Handle refresh failure by logging and forcing logout
 * @param api - RTK Query API instance
 * @returns Promise that resolves when logout completes
 */
async function handleRefreshFailure(api: BaseQueryApi): Promise<void> {
  if (DEV) console.warn('❌ [baseQuery] Refresh failed, forcing logout')

  await executeLogout(api)
}

/**
 * Handle refresh errors (network, timeout, etc.) by logging and forcing logout
 * @param error - The error that occurred during refresh
 * @param api - RTK Query API instance
 * @returns Promise that resolves when logout completes
 */
async function handleRefreshError(error: unknown, api: BaseQueryApi): Promise<void> {
  if (DEV) console.error('💥 [baseQuery] Refresh request failed:', error)
  await executeLogout(api)
}

/**
 * Execute logout with deduplication to prevent multiple simultaneous logout calls
 * @param api - RTK Query API instance
 * @returns Logout promise
 */
export async function executeLogout(
  api: BaseQueryApi
): Promise<QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>> {
  const args: FetchArgs = { url: '/auth/logout', method: 'POST' }
  return baseQuery(args, api, {}) as Promise<
    QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>
  >
}

/**
 * Execute refresh token request with Single Flight Pattern
 * @param api - RTK Query API instance
 * @param extraOptions - Additional options for the request
 * @returns Promise resolving to refresh result
 */
function executeRefresh(
  api: BaseQueryApi,
  extraOptions: Parameters<BaseQueryFn>[2]
): Promise<QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>> {
  return baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions) as Promise<
    QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>
  >
}

/**
 * Fetch CSRF token when missing in store
 */
async function ensureCsrfToken(api: BaseQueryApi, extraOptions: Parameters<BaseQueryFn>[2]) {
  const state = api.getState() as RootState
  const currentToken = state.security.csrfToken

  if (currentToken) return

  try {
    const response = (await baseQuery(
      { url: '/security/csrf-token', method: 'GET' },
      api,
      extraOptions
    )) as QueryReturnValue<{ csrfToken: string }, FetchBaseQueryError>

    if (response?.data?.csrfToken) {
      api.dispatch(setCsrfToken(response.data.csrfToken))
    }
  } catch (error) {
    if (DEV) console.error('❌ Error fetching CSRF token:', error)
  }
}

const baseQuery = fetchBaseQuery({
  credentials: 'include', // for HttpOnly cookies (refresh service)
  baseUrl: VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken
    const csrfToken = (getState() as RootState).security.csrfToken

    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`)
    if (csrfToken) headers.set('x-csrf-token', csrfToken)
    return headers
  },
})

// BaseQuery that detects 401 and triggers refresh automatically
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  ApiResponse,
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  const url = extractUrl(args)

  // Always ensure CSRF token is present before first attempt
  await ensureCsrfToken(api, extraOptions)

  // Execute original request
  let result = (await baseQuery(args, api, extraOptions)) as QueryReturnValue<
    ApiResponse,
    FetchBaseQueryError,
    object
  >

  // Handle CSRF mismatch (403)
  if (result.error?.status === HTTP_STATUS.FORBIDDEN) {
    const errMsg = (result.error.data as { message: string })?.message ?? ''

    if (errMsg.toLowerCase().includes('csrf')) {
      if (DEV) console.warn('⚠️ [baseQuery] CSRF mismatch detected, refetching token...')

      // force refresh CSRF token
      await ensureCsrfToken(api, extraOptions)

      // retry once with new CSRF token
      result = (await baseQuery(args, api, extraOptions)) as QueryReturnValue<
        ApiResponse,
        FetchBaseQueryError,
        object
      >
    }
  }

  // Handle 401 unauthorized responses
  if (result.error?.status === HTTP_STATUS.UNAUTHORIZED && !isAuthPath(url)) {
    logRefreshAttempt(url)

    // Single Flight Pattern: prevent multiple simultaneous refresh calls
    const isNewRefresh = !refreshPromise
    if (isNewRefresh) {
      refreshPromise = executeRefresh(api, extraOptions)
    }

    logRefreshStatus(isNewRefresh)

    try {
      const refreshResult = await refreshPromise
      refreshPromise = null // Reset after completion

      if (refreshResult?.data) {
        result = await handleRefreshSuccess(api, refreshResult.data, args, extraOptions)
      } else {
        if (!logoutPromise) {
          logoutPromise = handleRefreshFailure(api)
        }
        await logoutPromise
        logoutPromise = null // Reset after completion
      }
    } catch (error) {
      refreshPromise = null // Reset on error

      if (!logoutPromise) {
        logoutPromise = handleRefreshError(error, api)
      }
      await logoutPromise
      logoutPromise = null // Reset after completion
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'Task',
    'Event',
    'Category',
    'User',
    'Invitation',
    'Notification',
    'Security',
  ] as const,
  endpoints: () => ({}),
})
