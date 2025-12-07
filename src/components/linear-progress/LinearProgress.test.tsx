import { render, screen } from '@testing-library/react'

import { LinearProgress } from './LinearProgress'

import styles from './LinearProgress.module.css'

describe('LinearProgress', () => {
  it('should render progressbar with correct value and a11y attributes', () => {
    render(<LinearProgress value={42} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toBeInTheDocument()
    expect(progressbar).toHaveAttribute('aria-valuenow', '42')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
    const bar = progressbar.querySelector(`.${styles.linearProgressBar}`)
    expect(bar).toHaveStyle({ width: '42%' })
  })

  it('should show label when showLabel is true', () => {
    render(<LinearProgress value={75} showLabel />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('should not show label when showLabel is false', () => {
    render(<LinearProgress value={10} />)
    expect(screen.queryByText('10%')).not.toBeInTheDocument()
  })
})
