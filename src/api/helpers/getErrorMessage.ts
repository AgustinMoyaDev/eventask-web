import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

import { ApiResponseBody } from '@/api/types/response'

export enum OperationError {
  ACCEPT = 'accept',
  CREATE = 'create',
  DELETE = 'delete',
  FETCH = 'fetch',
  FETCH_BY_ID = 'fetchById',
  FETCH_COUNT = 'fetchCount',
  INVITE = 'invite',
  LOGIN = 'login',
  LOGIN_WITH_GOOGLE = 'loginWithGoogle',
  LOGOUT = 'logout',
  MARK_ALL_READ = 'markAllRead',
  MARK_READ = 'markRead',
  REFRESH = 'refresh',
  REGISTER = 'register',
  REJECT = 'reject',
  UPDATE = 'update',
  UPDATE_EVENT_STATUS = 'updateEventStatus',
  UPLOAD = 'upload',
  ASSIGN_COLLABORATOR = 'assignCollaborator',
  REMOVE_COLLABORATOR = 'removeCollaborator',
  FORGOT_PASSWORD = 'forgotPassword',
  RESET_PASSWORD = 'resetPassword',
}

export type RTKQueryError = FetchBaseQueryError | SerializedError | undefined

export interface ParsedError {
  message: string
  fieldsValidations?: Record<string, string>
}

const isFetchBaseQueryError = (rtkqError: RTKQueryError): FetchBaseQueryError | undefined => {
  if (typeof rtkqError === 'object' && 'status' in rtkqError) {
    return rtkqError
  }
  return
}

/**
 * Return a different ParsedError depending on the operation:
 * - FETCH/DELETE: message only
 * - CREATE/UPDATE/LOGIN/REGISTER, etc: message + fieldsValidations
 */
function parseError(operation: OperationError, error: RTKQueryError): ParsedError {
  if (!error) return { message: '' }

  if (isFetchBaseQueryError(error)) {
    const fbqError = error as FetchBaseQueryError
    const body = fbqError.data as ApiResponseBody

    const fieldsErrors: Record<string, string> = {}
    if (body?.errors) {
      for (const [field, detail] of Object.entries(body.errors)) {
        // Handle both string and object error formats
        fieldsErrors[field] = typeof detail === 'string' ? detail : detail.msg
      }
    }

    // operations that may have field validations
    if (
      operation === OperationError.CREATE ||
      operation === OperationError.UPDATE ||
      operation === OperationError.UPLOAD ||
      operation === OperationError.LOGIN ||
      operation === OperationError.REGISTER ||
      operation === OperationError.INVITE ||
      operation === OperationError.ACCEPT ||
      operation === OperationError.REJECT ||
      operation === OperationError.FORGOT_PASSWORD ||
      operation === OperationError.RESET_PASSWORD
    ) {
      return {
        message: body?.message,
        fieldsValidations: fieldsErrors,
      }
    }
    return { message: body?.message }
  }
  const szdError = error as SerializedError
  return { message: szdError.message ?? '' }
}

interface WrapperError {
  operation: OperationError
  error: RTKQueryError
}

export function getErrorMessage(errors: WrapperError[]): Record<OperationError, ParsedError> {
  const errorsResult = errors?.reduce<Record<OperationError, ParsedError>>(
    (acc, { operation, error }) => {
      const { message, fieldsValidations } = parseError(operation, error)
      const hasFields = fieldsValidations && Object.keys(fieldsValidations).length > 0
      const hasMsg = message !== ''
      if (hasMsg || hasFields) {
        acc[operation] = { message, fieldsValidations }
      }
      return acc
    },
    {} as Record<OperationError, ParsedError>
  )
  return errorsResult
}
