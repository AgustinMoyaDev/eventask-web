import { render, screen, fireEvent } from '@testing-library/react'

import { Dropdown } from './Dropdown'

describe('Dropdown', () => {
  const renderDropdown = (props = {}) =>
    render(
      <Dropdown trigger={<button>Open</button>} {...props}>
        <div>Menu Item</div>
      </Dropdown>
    )

  const getDropdownElements = () => {
    const children = screen.getByText('Menu Item')
    const button = screen.getByText('Open')
    const summary = button.closest('summary') as HTMLElement
    const details = summary.parentElement as HTMLDetailsElement
    return { button, summary, details, children }
  }

  it('renders trigger and children', () => {
    renderDropdown({ className: 'custom-class' })
    const { button, details, children } = getDropdownElements()

    expect(button).toBeInTheDocument()
    expect(children).toBeInTheDocument()
    expect(details).toHaveClass('custom-class')
  })

  it('toggles open state on click', () => {
    renderDropdown()
    const { summary, details } = getDropdownElements()

    // initially closed
    expect(details.hasAttribute('open')).toBe(false)
    // click to open
    fireEvent.click(summary)
    expect(details.hasAttribute('open')).toBe(true)
    // click to close
    fireEvent.click(summary)
    expect(details.hasAttribute('open')).toBe(false)
  })

  it('closes on Escape key', () => {
    renderDropdown()
    const { summary, details } = getDropdownElements()

    // open first
    fireEvent.click(summary)
    expect(details.hasAttribute('open')).toBe(true)

    // press Escape
    fireEvent.keyDown(summary, { key: 'Escape' })
    expect(details.hasAttribute('open')).toBe(false)
  })

  it('closes when clicking outside', () => {
    render(
      <>
        <Dropdown trigger={<button>Open</button>}>
          <div>Menu Item</div>
        </Dropdown>
        <div data-testid="outside">Outside</div>
      </>
    )

    const button = screen.getByText('Open')
    const summary = button.closest('summary') as HTMLElement
    const details = summary.parentElement as HTMLDetailsElement

    // open dropdown
    fireEvent.click(summary)
    expect(details.hasAttribute('open')).toBe(true)

    // click outside
    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(details.hasAttribute('open')).toBe(false)
  })

  it('updates aria-expanded correctly', () => {
    renderDropdown()
    const { summary } = getDropdownElements()

    // initially closed
    expect(summary).toHaveAttribute('aria-expanded', 'false')

    // click to open
    fireEvent.click(summary)
    expect(summary).toHaveAttribute('aria-expanded', 'true')

    // click to close
    fireEvent.click(summary)
    expect(summary).toHaveAttribute('aria-expanded', 'false')

    // open again
    fireEvent.click(summary)
    // press Escape
    fireEvent.keyDown(summary, { key: 'Escape' })
    expect(summary).toHaveAttribute('aria-expanded', 'false')
  })
})
