import { MemoryRouter } from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { LoginForm } from './LoginForm'

// useAuthActions Mock
const mockLogin = vi.fn()
const mockLoginAuthError = { message: '', fieldsValidations: {} }

vi.mock('@/store/hooks/useAuthActions', () => ({
  useAuthActions: () => ({
    login: mockLogin,
    loginLoading: false,
    loginAuthError: mockLoginAuthError,
  }),
}))

describe('LoginForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLoginAuthError.message = ''
    mockLoginAuthError.fieldsValidations = {}
  })

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )
  }

  it('starts with disabled submit button', () => {
    renderComponent()
    expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled()
  })

  it('renders login form fields and button', () => {
    renderComponent()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('shows validation errors on blur (interaction)', async () => {
    const user = userEvent.setup()
    renderComponent()

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.click(emailInput)
    await user.tab()

    await user.click(passwordInput)
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/email can not be empty/i)).toBeInTheDocument()
      expect(screen.getByText(/password should have at least 6 characters/i)).toBeInTheDocument()
    })
  })

  it('enables button and calls login when form is valid', async () => {
    const user = userEvent.setup()
    renderComponent()

    const submitBtn = screen.getByRole('button', { name: /log in/i })

    expect(submitBtn).toBeDisabled()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')

    await waitFor(() => {
      expect(submitBtn).toBeEnabled()
    })

    await user.click(submitBtn)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup()
    renderComponent()

    const emailInput = screen.getByLabelText(/email/i)

    // Escribimos algo que no es email y salimos (blur)
    await user.type(emailInput, 'holamundo')
    await user.tab()

    // Esperamos el mensaje del .pipe(z.email())
    await waitFor(() => {
      expect(screen.getByText(/email is not valid/i)).toBeInTheDocument()
    })
  })
})
