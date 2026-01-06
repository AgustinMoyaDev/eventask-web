/**
 * Notification Factory
 * Generates fake INotification objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'
import type { INotification, NotificationType } from '@/types/INotification'
import { NOTIFICATION_TYPE } from '@/types/INotification'

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
 * Creates a fake INotification object with realistic data.
 *
 * @param overwrites - Partial INotification to override default generated values
 * @returns A complete INotification object with fake data
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
export function createFakeNotification(overwrites: Partial<INotification> = {}): INotification {
  // Determine notification type first
  const type: NotificationType =
    overwrites.type ?? faker.helpers.arrayElement(Object.values(NOTIFICATION_TYPE))

  // Get templates for this type
  const templates = NOTIFICATION_TEMPLATES[type]
  const title = overwrites.title ?? faker.helpers.arrayElement(templates.titles)
  const message = overwrites.message ?? faker.helpers.arrayElement(templates.messages)

  // Generate data based on type
  const defaultData = {
    taskId: type === 'task' ? faker.string.uuid() : undefined,
    eventId: type === 'event' ? faker.string.uuid() : undefined,
    invitationId: type === 'invitation' ? faker.string.uuid() : undefined,
    fromUserId: faker.string.uuid(),
    fromUserName: faker.person.fullName(),
    actionUrl: `/${type}s/${faker.string.uuid()}`,
  }

  const {
    id = faker.string.uuid(),
    userId = faker.string.uuid(),
    data = defaultData,
    read = faker.datatype.boolean(),
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
function sortByMostRecent(notifications: INotification[]): INotification[] {
  return notifications.sort((a, b) => {
    const timeA = a.createdAt.getTime()
    const timeB = b.createdAt.getTime()
    return timeB - timeA // Descending order (most recent first)
  })
}

/**
 * Creates multiple fake INotification objects.
 *
 * @param count - Number of notifications to generate
 * @param overwrites - Partial INotification applied to all generated notifications
 * @returns Array of INotification objects
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
  overwrites: Partial<INotification> = {}
): INotification[] {
  const notifications = Array.from({ length: count }, () => createFakeNotification(overwrites))
  return sortByMostRecent(notifications)
}
