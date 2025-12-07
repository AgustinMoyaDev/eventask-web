import { ConfirmModalProps } from '@/types/ui/confirm-modal'

import { Button } from '../button/Button'
import { Modal } from '../modal/Modal'

import styles from './ConfirmModal.module.css'

export const ConfirmModal = ({
  isOpen,
  title = '',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <p className={styles.confirmModalMessage}>{message}</p>
      <div className={styles.confirmModalActions}>
        <Button variant="text" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="filled" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
