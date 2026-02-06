import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { ForgotPasswordForm } from './ForgotPasswordForm'

const mockForgotPassword = vi.fn()
const mockAuthError = { message: '', fieldsValidations: {} }

vi.mock('@/store/hooks/useAuthActions', () => ({
  useAuthActions: () => ({
    forgotPassword: mockForgotPassword,
    forgotPasswordLoading: false,
    forgotPasswordAuthError: mockAuthError,
  }),
}))

describe('ForgotPasswordForm Component', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthError.message = ''
    mockAuthError.fieldsValidations = {}
  })

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <ForgotPasswordForm onSuccess={mockOnSuccess} />
      </MemoryRouter>
    )
  }

  it('renders email input and buttons', () => {
    renderComponent()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send email/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go back to log in/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderComponent()

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/email is not valid/i)).toBeInTheDocument()
    })
  })

  it('calls forgotPassword action and onSuccess when valid', async () => {
    const user = userEvent.setup()
    // Mock successful response (no error)
    mockForgotPassword.mockResolvedValue({})
    renderComponent()

    const emailInput = screen.getByLabelText(/email/i)
    const submitBtn = screen.getByRole('button', { name: /send email/i })

    await user.type(emailInput, 'agustin@eventask.com')
    await user.click(submitBtn)

    await waitFor(() => {
      // 1. Check Redux action call
      expect(mockForgotPassword).toHaveBeenCalledWith({ email: 'agustin@eventask.com' })
      // 2. Check Success Callback call
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('does NOT call onSuccess if action fails', async () => {
    const user = userEvent.setup()
    mockForgotPassword.mockResolvedValue({ error: 'Network Error' })
    renderComponent()

    await user.type(screen.getByLabelText(/Email/), 'fail@test.com')
    await user.click(screen.getByRole('button', { name: /send email/i }))

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalled()
      // onSuccess must NOT be called
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })
  })
})
