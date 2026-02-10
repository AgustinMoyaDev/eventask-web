import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  const baseProps = {
    name: 'username',
    label: 'Username',
    type: 'text',
    value: '',
    onChange: vi.fn(),
    onBlur: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input and label with correct attributes', () => {
    render(<Input {...baseProps} placeholder="Enter your username" required />)
    const input = screen.getByRole('textbox', { name: /username/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'username')
    expect(input).toHaveAttribute('placeholder', 'Enter your username')
    expect(input).toBeRequired()
    expect(screen.getByLabelText(/username/i)).toBe(input)
  })

  it('calls onChange when value changes', () => {
    render(<Input {...baseProps} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'newuser' } })
    expect(baseProps.onChange).toHaveBeenCalledTimes(1)
  })

  it('calls onBlur when input loses focus', () => {
    render(<Input {...baseProps} />)
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    expect(baseProps.onBlur).toHaveBeenCalledTimes(1)
  })

  it('shows error message and sets aria attributes when error and touched', () => {
    render(<Input {...baseProps} error="Campo requerido" touched />)
    const input = screen.getByRole('textbox')
    expect(screen.getByText('Campo requerido')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
  })

  it('shows hint when provided and no error', () => {
    render(<Input {...baseProps} hint="Introduce tu usuario" />)
    expect(screen.getByText(/introduce tu usuario/i)).toBeInTheDocument()
  })

  it('renders as disabled when disabled prop is true', () => {
    render(<Input {...baseProps} disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('renders password visibility toggle for password type', () => {
    const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="eye" {...props} />
    const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="eye-off" {...props} />
    )

    render(
      <Input
        {...baseProps}
        type="password"
        initialStateIcon={EyeOffIcon}
        finalStateIcon={EyeIcon}
      />
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    // Initial state: should show EyeIcon
    expect(screen.getByTestId('eye')).toBeInTheDocument()
    fireEvent.click(button)
    // After click: should show EyeOffIcon
    expect(screen.getByTestId('eye-off')).toBeInTheDocument()
  })
})
