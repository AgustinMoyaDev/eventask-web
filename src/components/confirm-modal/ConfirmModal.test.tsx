import { render, screen, fireEvent } from '@testing-library/react'

import { ConfirmModal } from './ConfirmModal'

describe('ConfirmModal', () => {
  const onConfirm = vi.fn()
  const onCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when isOpen is false', () => {
    render(
      <ConfirmModal
        isOpen={false}
        message="Are you sure?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render title, message and default buttons', () => {
    render(
      <ConfirmModal
        isOpen
        title="Confirm action"
        message="Are you sure you want to continue?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Confirm action')).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to continue?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })

  it('allows customizing button labels', () => {
    render(
      <ConfirmModal
        isOpen
        message="Delete?"
        confirmLabel="Yes, delete"
        cancelLabel="No, go back"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )
    expect(screen.getByRole('button', { name: 'Yes, delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'No, go back' })).toBeInTheDocument()
  })

  it('calls onCancel when clicking Cancel', () => {
    render(
      <ConfirmModal isOpen message="Are you sure?" onConfirm={onConfirm} onCancel={onCancel} />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm when clicking Confirm', () => {
    render(
      <ConfirmModal isOpen message="Are you sure?" onConfirm={onConfirm} onCancel={onCancel} />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })
})
