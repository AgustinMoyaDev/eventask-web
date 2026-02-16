import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { ModalIds } from '@/components/modal/modal.types'

import { ChangePasswordForm } from './ChangePasswordForm'

const mockChangePassword = vi.fn()
const mockAuthError = { message: '', fieldErrors: {} }
const mockCloseModal = vi.fn()

vi.mock('@/auth/store/useAuthMutations', () => ({
  useAuthMutations: () => ({
    changePassword: mockChangePassword,
    changePasswordLoading: false,
    changePasswordError: mockAuthError,
  }),
}))

vi.mock('@/components/modal/store/useModalActions', () => ({
  useModalActions: (id: string) =>
    id === ModalIds.ChangePasswordForm ? { close: mockCloseModal, open: vi.fn() } : {},
}))

describe('ChangePasswordForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthError.message = ''
    mockAuthError.fieldErrors = {}
  })

  const renderComponent = () => render(<ChangePasswordForm />)

  it('renders all password inputs', () => {
    renderComponent()
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^new password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument()
  })

  it('shows error when new passwords do not match', async () => {
    const user = userEvent.setup()
    renderComponent()

    await user.type(screen.getByLabelText(/^new password/i), 'NewPass123')
    await user.type(screen.getByLabelText(/repeat password/i), 'DifferentPass123')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('calls API and closes modal on success', async () => {
    const user = userEvent.setup()
    // Success response mock
    mockChangePassword.mockResolvedValue({})
    renderComponent()

    // Fill valid form
    await user.type(screen.getByLabelText(/current password/i), 'OldPass123')
    await user.type(screen.getByLabelText(/^new password/i), 'NewPass123')
    await user.type(screen.getByLabelText(/repeat password/i), 'NewPass123')

    await user.click(screen.getByRole('button', { name: /change password/i }))

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith({
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
      })

      expect(mockCloseModal).toHaveBeenCalled()
    })
  })

  it('does NOT close modal if API returns error', async () => {
    const user = userEvent.setup()
    mockChangePassword.mockResolvedValue({ error: 'Wrong password' })

    renderComponent()

    await user.type(screen.getByLabelText(/current password/i), 'WrongPass')
    await user.type(screen.getByLabelText(/^new password/i), 'NewPass123')
    await user.type(screen.getByLabelText(/repeat password/i), 'NewPass123')
    await user.click(screen.getByRole('button', { name: /change password/i }))

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalled()
      // The modal should remain open
      expect(mockCloseModal).not.toHaveBeenCalled()
    })
  })
})
