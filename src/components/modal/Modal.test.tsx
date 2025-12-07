import { fireEvent, render, screen } from '@testing-library/react'

import { vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    onClose.mockClear()
  })

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <span>Modal content</span>
      </Modal>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <span>Modal content</span>
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <span>Modal content</span>
      </Modal>
    )
    const closeButton = screen.getByLabelText('Close dialog')
    closeButton.click()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when pressing Escape key', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <span>Modal content</span>
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when clicking inside modal content', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Inside</button>
      </Modal>
    )
    const insideBtn = screen.getByRole('button', { name: /inside/i })
    fireEvent.click(insideBtn)
    expect(onClose).not.toHaveBeenCalled()
  })
})
