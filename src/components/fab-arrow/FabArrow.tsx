import { RefObject } from 'react'

import { ArrowRightIcon, ArrowLeftIcon } from '../icons/Icons'
import { Button } from '../button/Button'

import { useHorizontalScroll } from './useHorizontalScroll'

import styles from './FabArrow.module.css'

interface ArrowButtonProps {
  direction: 'left' | 'right'
  scrollContainerRef: RefObject<HTMLUListElement>
}

export const FabArrow = ({ direction, scrollContainerRef }: ArrowButtonProps) => {
  const { canScrollPrev, canScrollNext, scrollByItem } = useHorizontalScroll(scrollContainerRef)

  const handleClick = () => {
    scrollByItem(direction)
  }

  const scrollDisabled = direction === 'left' ? !canScrollPrev : !canScrollNext

  // Only render the button when scrolling is possible
  if (scrollDisabled) return null

  return (
    <div
      className={`${styles.arrowButtonWrapper} ${direction === 'left' ? styles.arrowButtonWrapperLeft : styles.arrowButtonWrapperRight}`}
    >
      <Button
        variant="fab"
        size="sm"
        className={`${styles.arrowButton} ${direction === 'left' ? styles.arrowButtonLeft : styles.arrowButtonRight}`}
        onClick={handleClick}
        disabled={scrollDisabled}
        aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      >
        {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </Button>
    </div>
  )
}
