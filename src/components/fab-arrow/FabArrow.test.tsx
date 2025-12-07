import { render, screen, fireEvent } from '@testing-library/react'
import { FabArrow } from './FabArrow'

vi.mock('./useHorizontalScroll')

import { useHorizontalScroll } from './useHorizontalScroll'

const mockScrollByItem = vi.fn()
const mockedUseHorizontalScroll = vi.mocked(useHorizontalScroll)

const getMockHook = (canScrollPrev: boolean, canScrollNext: boolean) => ({
  canScrollPrev,
  canScrollNext,
  scrollByItem: mockScrollByItem,
})

describe('FabArrow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render right arrow and calls scrollByItem on click', () => {
    // Configure the mock to allow right scrolling
    mockedUseHorizontalScroll.mockReturnValue(getMockHook(false, true))
    const ref = { current: document.createElement('ul') }
    render(<FabArrow direction="right" scrollContainerRef={ref} />)
    const btn = screen.getByRole('button', { name: /scroll right/i })
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(mockScrollByItem).toHaveBeenCalledWith('right')
  })

  it('should render left arrow and calls scrollByItem on click', () => {
    mockedUseHorizontalScroll.mockReturnValue(getMockHook(true, false))
    const ref = { current: document.createElement('ul') }
    render(<FabArrow direction="left" scrollContainerRef={ref} />)
    const btn = screen.getByRole('button', { name: /scroll left/i })
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(mockScrollByItem).toHaveBeenCalledWith('left')
  })

  it('should not render button if cannot scroll in that direction', () => {
    mockedUseHorizontalScroll.mockReturnValue(getMockHook(false, false))
    const ref = { current: document.createElement('ul') }
    render(<FabArrow direction="right" scrollContainerRef={ref} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
