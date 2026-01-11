/**
 * Central export for all MSW handlers
 * Each domain has its own handler file for better organization
 * @see https://mswjs.io/docs/best-practices/structuring-handlers
 */
import { authHandlers } from './auth'
import { userHandlers } from './user'
import { taskHandlers } from './task'
import { notificationHandlers } from './notification'
import { categoryHandlers } from './category'
import { securityHandlers } from './security'
import { socketHandlers } from './socket'
import { eventHandlers } from './event'
import { invitationHandlers } from './invitation'

/**
 * Combined array of all request handlers
 * Add new domain handlers here as you expand the mock API
 */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...taskHandlers,
  ...eventHandlers,
  ...notificationHandlers,
  ...invitationHandlers,
  ...categoryHandlers,
  ...securityHandlers,
  ...socketHandlers,
]
