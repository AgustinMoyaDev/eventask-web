import { useMemo } from 'react'

import {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from '@/services/authApi'
import { AUTH_STATUS } from '@/types/ui/auth-status'
import { getErrorMessage, OperationError } from '@/api/helpers/getErrorMessage'

import { useAppSelector } from '../reduxStore'

export const useAuthActions = () => {
  const { status, currentUserId } = useAppSelector(state => state.auth)

  const [logout, { isLoading: logoutLoading, error: logoutError }] = useLogoutMutation()
  const [login, { isLoading: loginLoading, error: loginError }] = useLoginMutation()
  const [loginWithGoogle, { isLoading: loginWithGoogleLoading, error: loginWithGoogleError }] =
    useLoginWithGoogleMutation()
  const [register, { isLoading: registerLoading, error: registerError }] = useRegisterMutation()
  const [refresh, { error: refreshError }] = useRefreshMutation()
  const [forgotPassword, { isLoading: forgotPasswordLoading, error: forgotPasswordError }] =
    useForgotPasswordMutation()
  const [resetPassword, { isLoading: resetPasswordLoading, error: resetPasswordError }] =
    useResetPasswordMutation()

  const {
    login: loginAuthError,
    loginWithGoogle: loginWithGoogleAuthError,
    register: registerAuthError,
    refresh: refreshAuthError,
    forgotPassword: forgotPasswordAuthError,
    resetPassword: resetPasswordAuthError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.LOGIN, error: loginError },
        { operation: OperationError.LOGIN_WITH_GOOGLE, error: loginWithGoogleError },
        { operation: OperationError.REGISTER, error: registerError },
        { operation: OperationError.REFRESH, error: refreshError },
        { operation: OperationError.FORGOT_PASSWORD, error: forgotPasswordError },
        { operation: OperationError.RESET_PASSWORD, error: resetPasswordError },
      ]),
    [
      loginError,
      loginWithGoogleError,
      registerError,
      refreshError,
      forgotPasswordError,
      resetPasswordError,
    ]
  )

  return {
    // STATE - Optimized auth data only
    status,
    currentUserId,
    isAuthenticated: status === AUTH_STATUS.AUTHENTICATED,
    // Data y flags RTKQ
    loginLoading,
    loginWithGoogleLoading,
    registerLoading,
    logoutLoading,
    forgotPasswordLoading,
    resetPasswordLoading,
    // Mutations RTKQ
    forgotPassword,
    resetPassword,
    logout,
    login,
    loginWithGoogle,
    register,
    refresh,
    // RTKQ errors
    loginAuthError,
    loginWithGoogleAuthError,
    registerAuthError,
    refreshAuthError,
    logoutError,
    forgotPasswordAuthError,
    resetPasswordAuthError,
  }
}
