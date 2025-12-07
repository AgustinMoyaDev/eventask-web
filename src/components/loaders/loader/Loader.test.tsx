import { render, screen } from '@testing-library/react'

import { Loader } from './Loader'

import styles from './Loader.module.css'

describe('Loader', () => {
  it('should render loader with correct role and aria-live', () => {
    render(<Loader />)
    const loader = screen.getByRole('status')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveAttribute('aria-live', 'polite')
    expect(loader).toHaveClass(styles.loader)
    expect(loader.querySelector(`.${styles.loaderSpinner}`)).toBeInTheDocument()
  })
})
