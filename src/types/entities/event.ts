import { Base } from './base'
import { User } from './user'
import { Task } from './task'

/**
 * Event status enumeration
 */
export const EVENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]

/**
 * Event entity as it exists in the system
 * Represents a complete event as returned by the API
 * @entity
 */
export interface Event extends Base {
  title: string
  start: string
  end: string
  notes: string
  status: EventStatus
  taskId: string
  createdBy: string
  // Optional relations (populated based on API query)
  task?: Task
  collaborators?: User[]
  creator?: User
}
