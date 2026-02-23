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
  status: EventStatus
  notes: string
  start: string
  end: string
  taskId: string
  createdBy: string
  collaboratorsIds?: string[]
  // Optional relations (populated based on API query)
  task?: Task
  collaborators?: User[]
  creator?: User
}
