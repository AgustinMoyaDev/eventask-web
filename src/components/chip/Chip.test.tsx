import { render, screen } from '@testing-library/react'

import { CHIP_COLOR, CHIP_VARIANT } from './chip.types'

import { Chip } from './Chip'

import styles from './Chip.module.css'

describe('Chip', () => {
  it('should render with default props', () => {
    render(<Chip label="Default Chip" role="status" />)
    const chip = screen.getByRole('status')
    expect(chip).toBeInTheDocument()
    expect(chip).toHaveClass(styles[CHIP_COLOR.default])
    expect(chip).toHaveClass(styles[CHIP_VARIANT.filled])
  })

  it('should render with custom color and variant', () => {
    render(
      <Chip
        label="Custom Chip"
        role="status"
        color={CHIP_COLOR.completed}
        variant={CHIP_VARIANT.outlined}
      />
    )
    const chip = screen.getByRole('status')
    expect(chip).toHaveClass(styles[CHIP_COLOR.completed])
    expect(chip).toHaveClass(styles[CHIP_VARIANT.outlined])
  })

  it('should apply custom className', () => {
    render(<Chip label="Custom Class" role="status" className="custom-chip" />)
    const chip = screen.getByRole('status')
    expect(chip).toHaveClass('custom-chip')
  })
})
