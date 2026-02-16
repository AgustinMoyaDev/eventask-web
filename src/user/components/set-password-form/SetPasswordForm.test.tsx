import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { ModalIds } from '@/components/modal/modal.types'

import { SetPasswordForm } from './SetPasswordForm'

const mockSetPassword = vi.fn()
const mockAuthError = {
  message: 'General error message',
  fieldErrors: {
    newPassword: 'Too weak',
    email: 'Invalid format',
  },
}
const mockCloseModal = vi.fn()

vi.mock('@/auth/store/useAuthMutations', () => ({
  useAuthMutations: () => ({
    setPassword: mockSetPassword,
    setPasswordLoading: false,
    setPasswordError: mockAuthError,
  }),
}))

vi.mock('@/components/modal/store/useModalState')
vi.mock('@/components/modal/store/useModalActions', () => ({
  useModalActions: (id: string) =>
    id === ModalIds.SetPasswordForm ? { close: mockCloseModal, open: vi.fn() } : {},
}))

describe('SetPasswordForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthError.message = ''
    mockAuthError.fieldErrors = { newPassword: '', email: '' }
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
    mockAuthError.message = 'Backend error message'

    renderComponent()

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveTextContent(/Backend error message/i)
  })
})
