import React from 'react'
import clsx from 'clsx'

import { SlideTransitionProps } from './slide-transition.types'

import styles from './SlideTransition.module.css'

/**
 * SlideTransition wraps its children in a viewport that
 * clips overflow, and applies slide-in animations based on direction.
 */
export const SlideTransition: React.FC<SlideTransitionProps> = ({
  direction,
  onAnimationEnd,
  children,
}) => {
  return (
    <div className={styles.slideViewport} onAnimationEnd={onAnimationEnd}>
      <section className={clsx(direction && styles[direction])}>{children}</section>
    </div>
  )
}
