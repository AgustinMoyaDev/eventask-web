import { RefObject, useLayoutEffect, useState } from 'react'

/**
 * Measure the height (in rem) of one "row" in a timescale,
 * combining the <small> element height + rowGap from its container.
 */
export function useRowHeight(
  containerRef: RefObject<HTMLElement>,
  labelRef: RefObject<HTMLElement>
) {
  const [rowHeight, setRowHeight] = useState(0)
  const [labelHeight, setLabelHeight] = useState(0)

  useLayoutEffect(() => {
    const container = containerRef.current
    const label = labelRef.current
    if (!container || !label) return

    const labelHeight = label.getBoundingClientRect().height
    const gap = parseFloat(getComputedStyle(container).rowGap || '0')

    setRowHeight(labelHeight + gap)
    setLabelHeight(labelHeight)
  }, [containerRef, labelRef])

  return { rowHeight, labelHeight }
}
