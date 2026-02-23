import { NOTIFICATION_TYPE } from '@/types/entities/notification'
import { INVITATION_STATUS } from '@/types/entities/invitation'
import type { Notification } from '@/types/entities/notification'

/**
 * Get notification type icon based on notification type
 * @param type - Notification type
 * @returns Icon emoji string
 */
export const getNotificationTypeIcon = (type: NOTIFICATION_TYPE): string => {
  switch (type) {
    case NOTIFICATION_TYPE.TASK:
      return '📝'
    case NOTIFICATION_TYPE.EVENT:
      return '📅'
    case NOTIFICATION_TYPE.INVITATION:
      return '👥'
    case NOTIFICATION_TYPE.SYSTEM:
      return '📋'
    default:
      return '🔔'
  }
}

/**
 * Format notification timestamp for display
 * @param createdAt - Notification creation timestamp
 * @returns Formatted time string (e.g., "Just now", "3h ago", "5d ago")
 */
export const formatNotificationTime = (createdAt: string): string => {
  const date = new Date(createdAt)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  return date.toLocaleDateString()
}

/**
 * Determine if notification should show detail button
 * @param notification - Notification object
 * @returns True if detail button should be shown
 */
export const shouldShowDetailButton = (notification: Notification): boolean => {
  return Boolean(notification?.data?.invitationStatus === INVITATION_STATUS.PENDING)
}

/**
 * Get resolved invitation status for display
 * @param notification - Notification object
 * @returns Status string or false if not resolved
 */
export const getResolvedInvitationStatus = (notification: Notification) => {
  if (
    !notification?.data?.actionUrl ||
    notification.data.invitationStatus === INVITATION_STATUS.PENDING
  ) {
    return false
  }

  const { invitationStatus } = notification.data

  return invitationStatus === INVITATION_STATUS.REJECTED
    ? INVITATION_STATUS.REJECTED
    : INVITATION_STATUS.ACCEPTED
}
