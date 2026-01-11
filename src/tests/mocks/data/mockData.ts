import { ITask } from '@/types/ITask'
import { IUser } from '@/types/IUser'
import { IEvent } from '@/types/IEvent'
import { ICategoryWithTaskCount } from '@/types/ICategory'
import { INotification } from '@/types/INotification'

import { createFakeTasks } from '../factories/taskFactory'
import { createFakeUser, createFakeUsers } from '../factories/userFactory'
import { createFakeCategories } from '../factories/categoryFactory'
import { createFakeNotifications } from '../factories/notificationFactory'

/**
 * Session state for authentication
 * Tracks current logged-in user and token
 */
export interface MockSession {
  isAuthenticated: boolean
  user: IUser | null
  token: string | null
}

/**
 * Mock categories
 */
export const MOCK_CATEGORIES = [...createFakeCategories(7)]

/**
 * Mock logged-in user contacts
 */
export const MOCK_CONTACTS: IUser[] = [...createFakeUsers(5)]

/**
 * Consistent mock user ID across all handlers
 */
export const MOCK_LOGGED_USER_ID = 'mock-logged-user-id'

/**
 * Mock logged-in user profile
 */
export const MOCK_LOGGED_USER: IUser = createFakeUser({
  id: MOCK_LOGGED_USER_ID,
  email: 'demo@eventask.com',
  firstName: 'Demo',
  lastName: 'User',
  contacts: MOCK_CONTACTS,
})

/**
 * Current session state (mutable)
 * Modified by auth handlers (login/logout)
 */
export const MOCK_SESSION: MockSession = {
  isAuthenticated: true,
  user: MOCK_LOGGED_USER,
  token: 'mock-token',
}

/**
 * Single Source of Truth for mock tasks
 * Generated once and reused across all handlers
 * Tasks include events that are consistent across the app
 */
export const MOCK_TASKS: ITask[] = createFakeTasks(10, {
  createdBy: MOCK_LOGGED_USER_ID,
  creator: MOCK_LOGGED_USER,
  participants: MOCK_CONTACTS,
})

/**
 * Extract all events from mock tasks for event-specific endpoints
 * These are the same events embedded in MOCK_TASKS
 */
export const MOCK_EVENTS: IEvent[] = MOCK_TASKS.flatMap(task =>
  task.events.map(event => ({
    ...event,
    taskId: task.id,
    task: task,
  }))
)

/**
 * Calculates how many tasks use each category
 */
export const MOCK_CATEGORIES_TASK_COUNT: ICategoryWithTaskCount[] = MOCK_CATEGORIES.map(
  category => {
    const taskCount = MOCK_TASKS.filter(task => task.category.name === category.name).length
    return {
      ...category,
      taskCount,
    }
  }
)

/**
 * Mock notifications for logged-in user (includes invitations)
 * Mutable array for marking as read
 */
export const MOCK_NOTIFICATIONS: INotification[] = createFakeNotifications(15)
