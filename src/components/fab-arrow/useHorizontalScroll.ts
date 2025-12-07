import { RefObject, useState, useEffect, useCallback } from 'react'

/**
 * Hook to manage horizontal scroll state and navigation
 * @param scrollRef - Reference to the scrollable container
 * @returns Object with scroll state and navigation function
 */
export function useHorizontalScroll(scrollRef: RefObject<HTMLElement>) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  /**
   * Updates the scroll state by checking if scrolling is possible in each direction
   * Uses a 5px threshold to avoid false positives from browser rounding
   */
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 5)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [scrollRef])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // Listen for scroll events
    el.addEventListener('scroll', updateScrollState)

    // Observe container size changes
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)

    // Observe DOM changes (items added/removed)
    const mo = new MutationObserver(updateScrollState)
    mo.observe(el, { childList: true, subtree: true })

    // Initial state update
    updateScrollState()

    // Cleanup observers and listeners
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
      mo.disconnect()
    }
  }, [scrollRef, updateScrollState])

  /**
   * Scrolls the container by one item width in the specified direction
   * @param direction - Direction to scroll ('left' or 'right')
   */
  const scrollByItem = useCallback(
    (direction: 'left' | 'right') => {
      const el = scrollRef.current
      if (!el) return

      // Find first item to calculate width
      const firstChild = el.children[0] as HTMLElement
      if (!firstChild) return

      // Get gap between items from computed styles
      const gap = parseInt(getComputedStyle(el).gap, 10) || 0

      // Calculate total scroll distance (item width + gap)
      const step = firstChild.offsetWidth + gap

      // Perform smooth scroll
      el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
    },
    [scrollRef]
  )

  return { canScrollPrev, canScrollNext, scrollByItem }
}
