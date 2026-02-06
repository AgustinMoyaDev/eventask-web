import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { ResetPasswordForm } from './ResetPasswordForm'

const mockResetPassword = vi.fn()
const mockAuthError = { message: '', fieldsValidations: {} }

vi.mock('@/store/hooks/useAuthActions', () => ({
  useAuthActions: () => ({
    resetPassword: mockResetPassword,
    resetPasswordLoading: false,
    resetPasswordAuthError: mockAuthError,
  }),
}))

describe('ResetPasswordForm Component', () => {
  const mockOnSuccess = vi.fn()
  const fakeToken = 'abc-123-token'

  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthError.message = ''
    mockAuthError.fieldsValidations = {}
  })

  const renderComponent = () => {
    render(<ResetPasswordForm token={fakeToken} onSuccess={mockOnSuccess} />)
  }

  it('renders password inputs and button', () => {
    renderComponent()
    expect(screen.getByLabelText(/^new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderComponent()

    await user.type(screen.getByLabelText(/^new password/i), 'secret123')
    await user.type(screen.getByLabelText(/repeat password/i), 'secret124')
    await user.tab() // Trigger validation

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('submits form with token and new password when valid', async () => {
    const user = userEvent.setup()
    mockResetPassword.mockResolvedValue({})

    renderComponent()

    await user.type(screen.getByLabelText(/^new password/i), 'newSecret123')
    await user.type(screen.getByLabelText(/repeat password/i), 'newSecret123')

    const submitBtn = screen.getByRole('button', { name: /change password/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        token: fakeToken,
        newPassword: 'newSecret123',
        type: expect.anything(), // or TOKEN_TYPE.RESET
      })

      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })
})
