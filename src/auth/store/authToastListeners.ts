import { authApi } from '@/services/authApi'
import { registerToastFor } from '@/components/toast/store/toastHelper'

export function registerAuthToastListeners() {
  const { forgotPassword, resetPassword, setPassword } = authApi.endpoints

  const forgotPasswordOperation = {
    endpoints: {
      matchPending: forgotPassword.matchPending,
      matchFulfilled: forgotPassword.matchFulfilled,
      matchRejected: forgotPassword.matchRejected,
    },
    messages: {
      loading: 'Sending reset password email…',
      success: 'Reset password email sent',
      error: 'Error sending reset password email',
    },
  }

  const resetPasswordOperation = {
    endpoints: {
      matchPending: resetPassword.matchPending,
      matchFulfilled: resetPassword.matchFulfilled,
      matchRejected: resetPassword.matchRejected,
    },
    messages: {
      loading: 'Processing new password…',
      success: 'Password reset successfully',
      error: 'Error resetting password',
    },
  }

  const setPasswordOperation = {
    endpoints: {
      matchPending: setPassword.matchPending,
      matchFulfilled: setPassword.matchFulfilled,
      matchRejected: setPassword.matchRejected,
    },
    messages: {
      loading: 'Setting new password…',
      success: 'Password set successfully',
      error: 'Error setting password',
    },
  }

  const toastAuthOperations = [
    forgotPasswordOperation,
    resetPasswordOperation,
    setPasswordOperation,
  ]

  toastAuthOperations.forEach(({ endpoints, messages }) =>
    registerToastFor({ endpoints, messages })
  )
}
