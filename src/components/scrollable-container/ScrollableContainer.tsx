import { useRef } from 'react'
import clsx from 'clsx'

import { ScrollableContainerProps } from './scrollable-container.types'

import { FabArrow } from '@/components/fab-arrow/FabArrow'

import styles from './ScrollableContainer.module.css'

export const ScrollableContainer = ({
  children,
  className = '',
  isEmpty = false,
}: ScrollableContainerProps) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)

  return (
    <div className={styles.scrollableContainer}>
      <FabArrow direction="left" scrollContainerRef={scrollContainerRef} />
      <ul
        ref={scrollContainerRef}
        className={clsx(
          styles.scrollableContainerList,
          className,
          isEmpty && styles.scrollableContainerListEmpty
        )}
      >
        {children}
      </ul>
      <FabArrow direction="right" scrollContainerRef={scrollContainerRef} />
    </div>
  )
}
