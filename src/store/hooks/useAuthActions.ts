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
import { AUTH_STATUS } from '@/types/ui/auth-status'
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

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
  const [setPassword, { isLoading: setPasswordLoading, error: setPasswordError }] =
    useSetPasswordMutation()
  const [changePassword, { isLoading: changePasswordLoading, error: changePasswordError }] =
    useChangePasswordMutation()

  const {
    login: loginAuthError,
    loginWithGoogle: loginWithGoogleAuthError,
    register: registerAuthError,
    refresh: refreshAuthError,
    forgotPassword: forgotPasswordAuthError,
    resetPassword: resetPasswordAuthError,
    setPassword: setPasswordAuthError,
    changePassword: changePasswordAuthError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.LOGIN, error: loginError },
        { operation: OperationError.LOGIN_WITH_GOOGLE, error: loginWithGoogleError },
        { operation: OperationError.REGISTER, error: registerError },
        { operation: OperationError.REFRESH, error: refreshError },
        { operation: OperationError.FORGOT_PASSWORD, error: forgotPasswordError },
        { operation: OperationError.RESET_PASSWORD, error: resetPasswordError },
        { operation: OperationError.SET_PASSWORD, error: setPasswordError },
        { operation: OperationError.CHANGE_PASSWORD, error: changePasswordError },
      ]),
    [
      loginError,
      loginWithGoogleError,
      registerError,
      refreshError,
      forgotPasswordError,
      resetPasswordError,
      setPasswordError,
      changePasswordError,
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
    setPasswordLoading,
    changePasswordLoading,
    // Mutations RTKQ
    forgotPassword,
    resetPassword,
    setPassword,
    changePassword,
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
    setPasswordAuthError,
    changePasswordAuthError,
  }
}
