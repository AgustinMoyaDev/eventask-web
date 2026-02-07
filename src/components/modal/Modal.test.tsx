import { fireEvent, render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    onClose.mockClear()
  })

  const renderComponent = (props = {}) => {
    const defaultProps = {
      isOpen: true,
      onClose: onClose,
      title: 'Test Modal',
      children: <div>Default content</div>,
    }

    const finalProps = { ...defaultProps, ...props }

    return render(
      <Modal isOpen={finalProps.isOpen} onClose={finalProps.onClose} title={finalProps.title}>
        {finalProps.children}
      </Modal>
    )
  }

  it('should not render when isOpen is false', () => {
    renderComponent({ isOpen: false })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    renderComponent()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    renderComponent()
    const closeButton = screen.getByRole('button', { name: /close dialog/i })
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when pressing Escape key', () => {
    renderComponent()
    const dialog = screen.getByRole('dialog')
    fireEvent(dialog, new Event('close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when clicking inside modal content', () => {
    renderComponent({
      children: <button>Inside Action</button>,
    })

    const insideBtn = screen.getByRole('button', { name: /inside action/i })
    fireEvent.click(insideBtn)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('should not call onClose when clicking on the backdrop', () => {
    renderComponent()
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
  })
})
