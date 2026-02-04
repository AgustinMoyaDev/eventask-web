import { IBase } from './IBase'
import { ITask } from './ITask'
import { IUser } from './IUser'
import { type EventSchemaType } from '@/helpers/form-validations/eventSchema'

export const EVENT_STATUS = {
  // ACTIVE: 'active',
  // PROGRESS: 'in-progress',
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]

/**
 * EventForm is now inferred directly from Zod Schema.
 * This ensures validations and types are synced.
 */
export type EventForm = EventSchemaType

/**
 * To manage existing or new events (generated ID):
 *  - Inherits all fields from EventForm
 *  - Add an `id` (temporary or the _id that comes from the server)
 */
export interface IEventLocal extends EventForm {
  id: string
  status?: EventStatus
  taskId?: string
}

export interface IEvent extends IBase, EventForm {
  status: EventStatus
  collaborators?: IUser[]
  taskId?: string
  task?: ITask
  createdBy: IUser | string
}

export type EventId = Pick<IEvent, 'id'>
export type EventTitle = Pick<IEvent, 'title'>
export type EventDates = Pick<IEvent, 'start' | 'end'>

export interface IEventCalendarResult {
  events: IEvent[]
  year: number
  month: number
  total: number
}

export interface IEventCalendarQueryParams {
  year: string
  month: string
}
