export interface ConfirmModalProps {
  isOpen: boolean
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  actionMessage?: string
  onConfirm: () => void
  onCancel: () => void
}
