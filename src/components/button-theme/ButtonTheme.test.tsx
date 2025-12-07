import { render, screen, fireEvent } from '@testing-library/react'
import { ButtonTheme } from './ButtonTheme'

import styles from './ButtonTheme.module.css'

describe('ButtonTheme component', () => {
  beforeEach(() => {
    localStorage.clear()
    document.body.removeAttribute('data-theme')
  })

  it('renders light theme by default', () => {
    render(<ButtonTheme />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()

    const iconSpan = button.querySelector(`.${styles.buttonThemeIconLight}`)
    expect(iconSpan).toBeInTheDocument()
    expect(iconSpan).toContainHTML('svg')
    expect(iconSpan).toHaveClass(styles.buttonThemeIconLight)

    expect(document.body.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('selected-theme')).toBe('light')
  })

  it('toggles theme on click', () => {
    render(<ButtonTheme />)
    const button = screen.getByRole('button', { name: /toggle theme/i })

    fireEvent.click(button)
    expect(button.querySelector(`.${styles.buttonThemeIconDark}`)).toBeInTheDocument()
    expect(document.body.dataset.theme).toBe('dark')
    expect(localStorage.getItem('selected-theme')).toBe('dark')

    fireEvent.click(button)
    expect(button.querySelector(`.${styles.buttonThemeIconLight}`)).toBeInTheDocument()
    expect(document.body.dataset.theme).toBe('light')
    expect(localStorage.getItem('selected-theme')).toBe('light')
  })
})
