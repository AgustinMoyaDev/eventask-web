import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { RegisterForm } from './RegisterForm'

const mockRegister = vi.fn()
const mockRegisterAuthError = { message: '', fieldsValidations: {} }

vi.mock('@/store/hooks/useAuthActions', () => ({
  useAuthActions: () => ({
    register: mockRegister,
    registerLoading: false,
    registerAuthError: mockRegisterAuthError,
  }),
}))

describe('RegisterForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRegisterAuthError.message = ''
    mockRegisterAuthError.fieldsValidations = {}
  })

  const renderComponent = () => {
    render(<RegisterForm />)
  }

  it('renders all register inputs and button', () => {
    renderComponent()
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    renderComponent()

    const passwordInput = screen.getByLabelText(/^password/i)
    await user.type(passwordInput, 'password123')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    await user.type(confirmPasswordInput, 'password666')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('calls register action when form is valid and passwords match', async () => {
    const user = userEvent.setup()
    renderComponent()

    await user.type(screen.getByLabelText(/first name/i), 'Lora')
    await user.type(screen.getByLabelText(/last name/i), 'Dev')
    await user.type(screen.getByLabelText(/^email/i), 'lora@test.com')
    await user.type(screen.getByLabelText(/^password/i), 'secret123')
    await user.type(screen.getByLabelText(/confirm password/i), 'secret123')

    const submitBtn = screen.getByRole('button', { name: /create account/i })

    await waitFor(() => {
      expect(submitBtn).toBeEnabled()
    })

    await user.click(submitBtn)

    await waitFor(() => {
      // Verify that it is called with the data (without confirmPassword)
      expect(mockRegister).toHaveBeenCalledWith({
        firstName: 'Lora',
        lastName: 'Dev',
        email: 'lora@test.com',
        password: 'secret123',
      })
    })
  })
})
