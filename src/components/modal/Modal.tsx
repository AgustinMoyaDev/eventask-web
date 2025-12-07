import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import { ModalProps } from '@/types/ui/modal'

import { Button } from '@/components/button/Button'

import { CloseIcon } from '../icons/Icons'

import styles from './Modal.module.css'

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      // Focus the first element of the modal
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const handleKeydownCloseModal = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-modal="true"
      role="dialog"
      onKeyDown={handleKeydownCloseModal}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalContent}>
        <Button
          type="button"
          variant="icon"
          className={styles.modalButtonClose}
          size="sm"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <CloseIcon aria-hidden="true" focusable="false" />
        </Button>
        <div className={styles.modalBody}>
          {title && <h2 className={clsx('text-title-lg', styles.modalTitle)}>{title}</h2>}
          {children}
        </div>
      </div>
    </dialog>,
    document.body
  )
}
