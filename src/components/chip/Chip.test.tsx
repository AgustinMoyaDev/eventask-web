import { render, screen } from '@testing-library/react'

import { COLOR_PROGRESS } from '@/types/ui/task'
import { VARIANT } from '@/types/ui/button'

import { Chip } from './Chip'

import styles from './Chip.module.css'

describe('Chip', () => {
  it('should render with default props', () => {
    render(<Chip label="Default Chip" role="status" />)
    const chip = screen.getByRole('status')
    expect(chip).toBeInTheDocument()
    expect(chip).toHaveClass(styles[COLOR_PROGRESS.default])
    expect(chip).toHaveClass(styles[VARIANT.filled])
  })

  it('should render with custom color and variant', () => {
    render(
      <Chip
        label="Custom Chip"
        role="status"
        color={COLOR_PROGRESS.completed}
        variant={VARIANT.outlined}
      />
    )
    const chip = screen.getByRole('status')
    expect(chip).toHaveClass(styles[COLOR_PROGRESS.completed])
    expect(chip).toHaveClass(styles[VARIANT.outlined])
  })

  it('should apply custom className', () => {
    render(<Chip label="Custom Class" role="status" className="custom-chip" />)
    const chip = screen.getByRole('status')
    expect(chip).toHaveClass('custom-chip')
  })
})
