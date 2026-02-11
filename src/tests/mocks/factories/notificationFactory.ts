/**
 * Notification Factory
 * Generates fake Notification objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'
import type {
  Notification,
  NotificationData,
  NotificationType,
} from '@/types/entities/notification'
import { NOTIFICATION_TYPE } from '@/types/entities/notification'
import { INVITATION_STATUS, InvitationStatus } from '@/types/entities/invitation'

/**
 * Realistic notification templates by type.
 * Used to generate context-appropriate titles and messages.
 */
const NOTIFICATION_TEMPLATES = {
  task: {
    titles: [
      'New Task Assigned',
      'Task Updated',
      'Task Completed',
      'Task Due Soon',
      'Task Overdue',
    ],
    messages: [
      'You have been assigned to a new task',
      'Task details have been updated',
      'Task has been marked as completed',
      'Task is due in 2 days',
      'Task is overdue',
    ],
  },
  event: {
    titles: ['Event Reminder', 'Event Updated', 'Event Cancelled', 'New Event Created'],
    messages: [
      'Your event starts in 1 hour',
      'Event time has been changed',
      'Event has been cancelled',
      'You have been invited to an event',
    ],
  },
  invitation: {
    titles: ['New Invitation', 'Invitation Accepted', 'Invitation Declined'],
    messages: [
      'You have received a collaboration invitation',
      'Your invitation has been accepted',
      'Your invitation has been declined',
    ],
  },
  system: {
    titles: ['System Update', 'Maintenance Notice', 'New Feature Available'],
    messages: [
      'System will be updated tonight',
      'Scheduled maintenance on Sunday',
      'Check out our new drag and drop feature',
    ],
  },
} as const

/**
 * Creates a fake Notification object with realistic data.
 *
 * @param overwrites - Partial Notification to override default generated values
 * @returns A complete Notification object with fake data
 *
 * @example
 * ```typescript
 * // Generate random notification
 * const notification = createFakeNotification()
 *
 * // Generate unread task notification
 * const taskNotif = createFakeNotification({
 *   type: 'task',
 *   read: false,
 *   data: { taskId: 'task-123' }
 * })
 *
 * // Generate invitation notification
 * const inviteNotif = createFakeNotification({
 *   type: 'invitation',
 *   data: {
 *     invitationId: 'invite-456',
 *     fromUserName: 'John Doe'
 *   }
 * })
 * ```
 */
export function createFakeNotification(overwrites: Partial<Notification> = {}): Notification {
  // Determine notification type first
  const type: NotificationType =
    overwrites.type ?? faker.helpers.arrayElement(Object.values(NOTIFICATION_TYPE))

  // Generate invitation-specific data with varied statuses
  let title: string
  let message: string
  let defaultData: NotificationData
  let readInvitation = true
  const fromUserNameInvitation = faker.person.fullName()

  if (type === NOTIFICATION_TYPE.INVITATION && !overwrites.data?.invitationStatus) {
    const invitationStatus = faker.helpers.arrayElement([
      'pending',
      'pending',
      'accepted',
      'rejected',
    ]) as InvitationStatus

    if (invitationStatus === INVITATION_STATUS.PENDING) {
      title = overwrites.title ?? 'New Invitation'
      message = overwrites.message ?? `${fromUserNameInvitation} sent you a contact invitation`
      readInvitation = false
    } else if (invitationStatus === INVITATION_STATUS.ACCEPTED) {
      title = overwrites.title ?? 'Invitation Accepted'
      message = overwrites.message ?? 'Your invitation has been accepted'
      readInvitation = true
    } else {
      title = overwrites.title ?? 'Invitation Declined'
      message = overwrites.message ?? 'Your invitation has been declined'
      readInvitation = true
    }

    defaultData = {
      invitationId: faker.string.uuid(),
      fromUserId: faker.string.uuid(),
      fromUserName: fromUserNameInvitation,
      invitationStatus,
      // actionUrl only for resolved invitations
      actionUrl:
        invitationStatus !== INVITATION_STATUS.PENDING
          ? `/tasks/${faker.string.uuid()}`
          : undefined,
    }
  } else {
    // Non-invitation types or explicit overwrites
    const templates = NOTIFICATION_TEMPLATES[type]
    title = overwrites.title ?? faker.helpers.arrayElement(templates.titles)
    message = overwrites.message ?? faker.helpers.arrayElement(templates.messages)

    defaultData = {
      taskId: type === 'task' ? faker.string.uuid() : undefined,
      eventId: type === 'event' ? faker.string.uuid() : undefined,
      invitationId: type === 'invitation' ? faker.string.uuid() : undefined,
      fromUserId: faker.string.uuid(),
      fromUserName: faker.person.fullName(),
      actionUrl: `/${type}s/${faker.string.uuid()}`,
      invitationStatus: overwrites.data?.invitationStatus,
    }
  }

  const {
    id = faker.string.uuid(),
    userId = faker.string.uuid(),
    data = defaultData,
    read = readInvitation || faker.datatype.boolean(),
    createdAt = faker.date.recent({ days: 7 }),
    updatedAt = faker.date.recent({ days: 1 }),
  } = overwrites

  return {
    id,
    userId,
    type,
    title,
    message,
    data,
    read,
    createdAt,
    updatedAt,
  }
}

/**
 * Sort notifications by creation date (most recent first)
 * @param notifications - Array of notifications to sort
 * @returns Sorted array (descending by createdAt)
 */
function sortByMostRecent(notifications: Notification[]): Notification[] {
  return notifications.sort((a, b) => {
    const timeA = a.createdAt.getTime()
    const timeB = b.createdAt.getTime()
    return timeB - timeA // Descending order (most recent first)
  })
}

/**
 * Creates multiple fake Notification objects.
 *
 * @param count - Number of notifications to generate
 * @param overwrites - Partial Notification applied to all generated notifications
 * @returns Array of Notification objects
 *
 * @example
 * ```typescript
 * // Generate 10 random notifications
 * const notifications = createFakeNotifications(10)
 *
 * // Generate 5 unread notifications
 * const unread = createFakeNotifications(5, { read: false })
 * ```
 */
export function createFakeNotifications(
  count: number,
  overwrites: Partial<Notification> = {}
): Notification[] {
  const notifications = Array.from({ length: count }, () => createFakeNotification(overwrites))
  return sortByMostRecent(notifications)
}
