import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { SetPasswordForm } from './SetPasswordForm'
import { ModalIds } from '@/types/ui/modal'

const mockSetPassword = vi.fn()
const mockAuthError = { message: '', fieldsValidations: {} }
const mockCloseModal = vi.fn()

vi.mock('@/store/hooks/useAuthActions', () => ({
  useAuthActions: () => ({
    setPassword: mockSetPassword,
    setPasswordLoading: false,
    setPasswordAuthError: mockAuthError,
  }),
}))

vi.mock('@/store/hooks/useModalActions', () => ({
  useModalActions: (id: string) =>
    id === ModalIds.SetPasswordForm ? { close: mockCloseModal } : {},
}))

describe('SetPasswordForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthError.message = ''
    mockAuthError.fieldsValidations = {}
  })

  const renderComponent = () => render(<SetPasswordForm />)

  it('renders accessible structure correctly', () => {
    renderComponent()

    expect(
      screen.getByRole('heading', { name: /add manual password/i, level: 3 })
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /set password/i })).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderComponent()

    await user.type(screen.getByLabelText(/^new password/i), 'SecurePass123')
    await user.type(screen.getByLabelText(/confirm password/i), 'DifferentPass')
    await user.click(screen.getByRole('button', { name: /set password/i }))

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })

    expect(mockSetPassword).not.toHaveBeenCalled()
  })

  it('submits valid data and closes modal', async () => {
    const user = userEvent.setup()
    mockSetPassword.mockResolvedValue({})

    renderComponent()

    await user.type(screen.getByLabelText(/^new password/i), 'MyNewPass123')
    await user.type(screen.getByLabelText(/confirm password/i), 'MyNewPass123')
    await user.click(screen.getByRole('button', { name: /set password/i }))

    await waitFor(() => {
      expect(mockSetPassword).toHaveBeenCalledWith({
        newPassword: 'MyNewPass123',
      })
      expect(mockCloseModal).toHaveBeenCalled()
    })
  })

  it('displays backend error message as an alert', () => {
    mockAuthError.message = 'Password is too weak'

    renderComponent()

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveTextContent(/password is too weak/i)
  })
})
