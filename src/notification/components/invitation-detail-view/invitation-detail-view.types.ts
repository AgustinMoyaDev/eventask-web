import { Notification } from '@/types/entities/notification'

export interface InvitationDetailViewProps {
  notification: Notification
  isProcessing?: { accepting: boolean; rejecting: boolean }
  onBack: () => void
}
