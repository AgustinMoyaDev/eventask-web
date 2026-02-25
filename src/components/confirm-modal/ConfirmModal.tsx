import { Button } from '../button/Button'
import { Loader } from '../loaders/loader/Loader'
import { Modal } from '../modal/Modal'

import { ConfirmModalProps } from './confirm-modal.types'

import styles from './ConfirmModal.module.css'

export const ConfirmModal = ({
  isOpen,
  title = '',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  actionMessage = '',
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
        <Button variant="filled" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? <Loader text={actionMessage} /> : confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
