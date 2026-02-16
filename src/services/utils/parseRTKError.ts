import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { ApiResponseBody } from '@/types/dtos/api/response'

export type RTKQueryError = FetchBaseQueryError | SerializedError | undefined

export interface ParsedRTKError {
  message: string
  fieldErrors: Record<string, string>
  status?: number
}

/**
 * Type-safe parser for RTK Query errors.
 *
 * Handles both FetchBaseQueryError (network/HTTP errors) and SerializedError (client-side errors).
 * Returns null if no error is present, making it safe to use with optional chaining.
 *
 * @param error - RTK Query error object from mutation or query
 * @returns Parsed error object with message, field-level validations, and HTTP status
 *
 * @example
 * ```typescript
 * const [createTask, { error }] = useCreateTaskMutation()
 * const parsedError = parseRTKError(error)
 *
 * if (parsedError?.fieldErrors.title) {
 *   console.error(parsedError.fieldErrors.title)
 * }
 * ```
 */
export function parseRTKError(error: RTKQueryError): ParsedRTKError | null {
  if (!error) return null

  // FetchBaseQueryError: Network/HTTP errors from API
  if ('status' in error) {
    const body = error.data as ApiResponseBody
    const fieldErrors: Record<string, string> = {}

    // Parse field-level validation errors from backend
    if (body?.errors) {
      for (const [field, detail] of Object.entries(body.errors)) {
        // Handle both string and object error formats
        fieldErrors[field] = typeof detail === 'string' ? detail : detail.msg
      }
    }

    return {
      message: body?.message ?? 'Unknown error',
      fieldErrors,
      status: typeof error.status === 'number' ? error.status : undefined,
    }
  }

  // SerializedError: Client-side errors (network failure, parsing errors, etc.)
  return {
    message: error.message ?? 'An unexpected error occurred',
    fieldErrors: {},
  }
}
