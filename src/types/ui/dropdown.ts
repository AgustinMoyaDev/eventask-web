import { Notification } from '../entities/notification'
import { Size } from './size'

export interface NotificationDropdownProps {
  /** Maximum number of notifications to display */
  maxNotifications?: number
  /** Show notification count badge */
  showBadge?: boolean
  /** Custom trigger element (optional) */
  trigger?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Size variant for the notification icon */
  size?: Size
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: Notification) => void
  /** Callback when "Mark all as read" is clicked */
  onMarkAllAsRead?: () => void
}

export enum DropdownView {
  LIST = 'invitation-list',
  INVITATION_DETAIL = 'invitation-detail',
}

export interface InvitationDetailViewProps {
  notification: Notification
  isProcessing?: { accepting: boolean; rejecting: boolean }
  onBack: () => void
}
