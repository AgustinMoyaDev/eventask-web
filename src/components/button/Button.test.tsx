import { render, screen } from '@testing-library/react'

import { vi } from 'vitest'

import { VARIANT } from '@/types/ui/button'

import { Button } from './Button'

import styles from './Button.module.css'

describe('Button component', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>)
    // screen is a shortcut to query the rendered DOM
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(styles.filled)
  })

  it('should render other variants correctly', () => {
    render(<Button variant={VARIANT.outlined}>Outlined</Button>)
    const button = screen.getByRole('button', { name: /outlined/i })
    expect(button).toHaveClass(styles.outlined)
  })

  it('should handle disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    )
    const button = screen.getByRole('button', { name: /click me/i })
    button.click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should call onClick when enabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should respect the type prop', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toHaveAttribute('type', 'submit')

    render(<Button type="reset">Reset</Button>)
    const resetButton = screen.getByRole('button', { name: /reset/i })
    expect(resetButton).toHaveAttribute('type', 'reset')
  })
})
