import { IPaginationOptions } from '@/api/types/pagination'
import { IBase } from './IBase'

import { InvitationStatus } from './IInvitation'

/**
 * Notification type enumeration
 * Defines different types of notifications in the system
 */
export enum NOTIFICATION_TYPE {
  TASK = 'task',
  EVENT = 'event',
  INVITATION = 'invitation',
  SYSTEM = 'system',
}

export type NotificationType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE]

/**
 * Notification entity interface.
 * Represents a single notification in the system.
 */
export interface INotification extends IBase {
  userId: string // User receiving the notification
  type: NotificationType
  title: string
  message: string
  data?: INotificationData // Additional context data
  read: boolean // Whether user has read it
}

/**
 * Additional data that can be attached to notifications.
 * Provides context for specific notification types.
 */
export interface INotificationData {
  invitationStatus?: InvitationStatus
  invitationId?: string // For invitation notifications
  taskId?: string // For task notifications
  eventId?: string // For event notifications
  fromUserId?: string
  fromUserName?: string
  actionUrl?: string // URL for notification action
}

/**
 * Query options for notification filtering.
 */
export interface INotificationQueryOptions extends IPaginationOptions {
  read?: boolean
  type?: string
}
