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
} from '@/features/auth/services/authApi'

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

  const errors = useMemo(() => {
    const rawErrors = {
      login: loginError,
      loginWithGoogle: loginWithGoogleError,
      logout: logoutError,
      register: registerError,
      refresh: refreshError,
      forgotPassword: forgotPasswordError,
      resetPassword: resetPasswordError,
      setPassword: setPasswordError,
      changePassword: changePasswordError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [
    loginError,
    loginWithGoogleError,
    logoutError,
    registerError,
    refreshError,
    forgotPasswordError,
    resetPasswordError,
    setPasswordError,
    changePasswordError,
  ])

  return {
    login,
    loginWithGoogle,
    logout,
    register,
    refresh,
    forgotPassword,
    resetPassword,
    setPassword,
    changePassword,
    loginLoading,
    loginWithGoogleLoading,
    logoutLoading,
    registerLoading,
    forgotPasswordLoading,
    resetPasswordLoading,
    setPasswordLoading,
    changePasswordLoading,
    errors,
  }
}
