import { render, screen } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import { ButtonLink } from './ButtonLink'
import styles from '../button/Button.module.css'

describe('ButtonLink component', () => {
  it('renders with default variant', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/home">Home</ButtonLink>
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass(styles.text)
    expect(link).not.toHaveAttribute('aria-disabled', 'true')
  })

  it('applies disabled state correctly', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/home" disabled>
          Home
        </ButtonLink>
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /home/i })
    // Note: ButtonLink does not add a 'disabled' class, only aria-disabled attribute
    expect(link).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/dashboard">
          <span>Dashboard</span>
        </ButtonLink>
      </MemoryRouter>
    )

    const child = screen.getByText(/dashboard/i)
    expect(child).toBeInTheDocument()
  })

  it('has the correct "to" prop', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/profile">Profile</ButtonLink>
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /profile/i })
    expect(link.getAttribute('href')).toBe('/profile')
  })
})
