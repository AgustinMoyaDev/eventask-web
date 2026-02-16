import { useMemo } from 'react'

import {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
  useChangePasswordMutation,
} from '@/services/authApi'

import { parseRTKError } from '@/services/utils/parseRTKError'

/**
 * Auth Mutations Hook
 *
 * Provides authentication operations (login, logout, register, etc.)
 * with loading states and error handling.
 *
 * Use this hook when you need to perform auth actions.
 *
 * @example
 * ```tsx
 * const { login, loginLoading, loginError } = useAuthMutations()
 *
 * const handleLogin = async (credentials) => {
 *   const { data } = await login(credentials)
 *   if (loginError) {
 *     console.error(loginError.message)
 *     console.error(loginError.fieldErrors.email)
 *   }
 * }
 * ```
 */
export const useAuthMutations = () => {
  const [login, { isLoading: loginLoading, error: loginRawError }] = useLoginMutation()
  const [loginWithGoogle, { isLoading: loginWithGoogleLoading, error: loginWithGoogleRawError }] =
    useLoginWithGoogleMutation()
  const [logout, { isLoading: logoutLoading, error: logoutRawError }] = useLogoutMutation()
  const [register, { isLoading: registerLoading, error: registerRawError }] = useRegisterMutation()
  const [refresh, { error: refreshRawError }] = useRefreshMutation()
  const [forgotPassword, { isLoading: forgotPasswordLoading, error: forgotPasswordRawError }] =
    useForgotPasswordMutation()
  const [resetPassword, { isLoading: resetPasswordLoading, error: resetPasswordRawError }] =
    useResetPasswordMutation()
  const [setPassword, { isLoading: setPasswordLoading, error: setPasswordRawError }] =
    useSetPasswordMutation()
  const [changePassword, { isLoading: changePasswordLoading, error: changePasswordRawError }] =
    useChangePasswordMutation()

  // Parse errors with memoization for performance
  const loginError = useMemo(() => parseRTKError(loginRawError), [loginRawError])
  const loginWithGoogleError = useMemo(
    () => parseRTKError(loginWithGoogleRawError),
    [loginWithGoogleRawError]
  )
  const logoutError = useMemo(() => parseRTKError(logoutRawError), [logoutRawError])
  const registerError = useMemo(() => parseRTKError(registerRawError), [registerRawError])
  const refreshError = useMemo(() => parseRTKError(refreshRawError), [refreshRawError])
  const forgotPasswordError = useMemo(
    () => parseRTKError(forgotPasswordRawError),
    [forgotPasswordRawError]
  )
  const resetPasswordError = useMemo(
    () => parseRTKError(resetPasswordRawError),
    [resetPasswordRawError]
  )
  const setPasswordError = useMemo(() => parseRTKError(setPasswordRawError), [setPasswordRawError])
  const changePasswordError = useMemo(
    () => parseRTKError(changePasswordRawError),
    [changePasswordRawError]
  )

  return {
    // Mutations
    login,
    loginWithGoogle,
    logout,
    register,
    refresh,
    forgotPassword,
    resetPassword,
    setPassword,
    changePassword,

    // Loading flags
    loginLoading,
    loginWithGoogleLoading,
    logoutLoading,
    registerLoading,
    forgotPasswordLoading,
    resetPasswordLoading,
    setPasswordLoading,
    changePasswordLoading,

    // Errors
    loginError,
    loginWithGoogleError,
    registerError,
    refreshError,
    logoutError,
    forgotPasswordError,
    resetPasswordError,
    setPasswordError,
    changePasswordError,
  }
}
