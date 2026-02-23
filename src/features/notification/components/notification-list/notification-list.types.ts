import { Notification } from '@/types/entities/notification'

export interface NotificationListProps {
  unreadCount: number
  notifications: Notification[]
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  fetchingNotifications: boolean
}
