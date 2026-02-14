import { Notification } from '@/types/entities/notification'

export type DropdownSize = 'sm' | 'md' | 'lg'

export interface NotificationDropdownProps {
  maxNotifications?: number
  showBadge?: boolean
  trigger?: React.ReactNode
  className?: string
  size?: DropdownSize
  onNotificationClick?: (notification: Notification) => void
  onMarkAllAsRead?: () => void
}

export enum NotificationDropdownView {
  LIST = 'invitation-list',
  INVITATION_DETAIL = 'invitation-detail',
}

export interface InvitationDetailViewProps {
  notification: Notification
  isProcessing?: { accepting: boolean; rejecting: boolean }
  onBack: () => void
}
