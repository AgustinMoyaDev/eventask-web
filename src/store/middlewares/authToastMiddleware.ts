import { authApi } from '@/services/authApi'

import { registerToastFor } from './toastHelper'

const { forgotPassword, resetPassword } = authApi.endpoints

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

const toastAuthOperations = [forgotPasswordOperation, resetPasswordOperation]

toastAuthOperations.forEach(({ endpoints, messages }) => registerToastFor({ endpoints, messages }))
