import { render, screen } from '@testing-library/react'

import { ScrollableContainer } from './ScrollableContainer'

import styles from './ScrollableContainer.module.css'

vi.mock('../fab-arrow/FabArrow', () => ({
  FabArrow: vi.fn(({ direction }) => (
    <button data-testid={`fab-arrow-${direction}`}>{direction}</button>
  )),
}))

describe('ScrollableContainer', () => {
  it('renders children inside ul and both FabArrow components', () => {
    render(
      <ScrollableContainer className="custom-class">
        <li>Item 1</li>
        <li>Item 2</li>
      </ScrollableContainer>
    )
    // Verifica que los FabArrow mockeados estén presentes
    expect(screen.getByTestId('fab-arrow-left')).toBeInTheDocument()
    expect(screen.getByTestId('fab-arrow-right')).toBeInTheDocument()

    // Verifica que los children estén dentro del ul
    const ul = screen.getByRole('list')
    expect(ul).toHaveClass(styles.scrollableContainerList, 'custom-class')
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies default class if className is not provided', () => {
    render(
      <ScrollableContainer>
        <li>Only Item</li>
      </ScrollableContainer>
    )
    const ul = screen.getByRole('list')
    expect(ul).toHaveClass(styles.scrollableContainerList)
  })
})
