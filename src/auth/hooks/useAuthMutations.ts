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
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

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
 * const { login, loginLoading, loginAuthError } = useAuthMutations()
 * ```
 */
export const useAuthMutations = () => {
  const [login, { isLoading: loginLoading, error: loginError }] = useLoginMutation()
  const [loginWithGoogle, { isLoading: loginWithGoogleLoading, error: loginWithGoogleError }] =
    useLoginWithGoogleMutation()
  const [logout, { isLoading: logoutLoading, error: logoutError }] = useLogoutMutation()
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
