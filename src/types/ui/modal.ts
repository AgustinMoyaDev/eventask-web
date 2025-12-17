export enum ModalIds {
  EventForm = 'eventForm',
  SetPasswordForm = 'setPasswordForm',
  ChangePasswordForm = 'changePasswordForm',
  Confirm = 'confirm',
}

export interface ModalProps {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}
