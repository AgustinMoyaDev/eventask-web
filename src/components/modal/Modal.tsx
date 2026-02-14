import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import { ModalProps } from './modal.types'

import { Button } from '@/components/button/Button'
import { CloseIcon } from '@/components/icons/Icons'

import styles from './Modal.module.css'

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  return createPortal(
    <dialog ref={dialogRef} className={styles.modal} aria-modal="true" onClose={handleClose}>
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
