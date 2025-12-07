import { render, screen, fireEvent } from '@testing-library/react'
import { SlideTransition } from '@/components/slide-transition/SlideTransition'

import styles from './SlideTransition.module.css'

describe('SlideTransition', () => {
  it('should render children inside slide viewport and section', () => {
    render(
      <SlideTransition direction="left">
        <span>Content</span>
      </SlideTransition>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    const viewport = screen.getByText('Content').closest(`.${styles.slideViewport}`)
    expect(viewport).toBeInTheDocument()
    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveClass(styles.left)
  })

  it('should apply correct class for each direction', () => {
    const { rerender } = render(
      <SlideTransition direction="right">
        <span>Right</span>
      </SlideTransition>
    )
    expect(screen.getByText('Right').closest('section')).toHaveClass(styles.right)

    rerender(
      <SlideTransition direction="center">
        <span>Center</span>
      </SlideTransition>
    )
    expect(screen.getByText('Center').closest('section')).toHaveClass(styles.center)

    rerender(
      <SlideTransition direction={null}>
        <span>None</span>
      </SlideTransition>
    )
    expect(screen.getByText('None').closest('section')).not.toHaveClass(
      styles.left,
      styles.right,
      styles.center
    )
  })

  it('should call onAnimationEnd when animation ends', () => {
    const onAnimationEnd = vi.fn()
    render(
      <SlideTransition direction="left" onAnimationEnd={onAnimationEnd}>
        <span>Anim</span>
      </SlideTransition>
    )
    fireEvent.animationEnd(screen.getByText('Anim').closest(`.${styles.slideViewport}`)!)
    expect(onAnimationEnd).toHaveBeenCalled()
  })
})
