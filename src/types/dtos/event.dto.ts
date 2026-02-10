import { Event, EventStatus } from '../entities/event'

/**
 * Base fields for event forms (matches Zod schema)
 */
export interface EventFormFields {
  title: string
  start: string
  end: string
  notes: string
}

/**
 * DTO for creating a new event
 * @api POST /events
 */
export interface CreateEventDto extends EventFormFields {
  taskId: string
}

/**
 * DTO for updating an existing event
 * @api PUT /events/:id
 */
export interface UpdateEventDto extends EventFormFields {
  id: string
  status: EventStatus
  taskId: string
}

/**
 * DTO for updating event status only
 * @api PATCH /events/:id/status
 */
export interface UpdateEventStatusDto {
  id: string
  status: EventStatus
}

/**
 * DTO for deleting an event (includes taskId for cache invalidation)
 * @api DELETE /events/:id
 */
export interface DeleteEventDto {
  id: string
  taskId: string
}

/**
 * API Response for calendar events
 */
export interface EventCalendarResponseDto {
  events: Event[]
  year: number
  month: number
  total: number
}

/**
 * Query parameters for calendar events
 */
export interface EventCalendarQueryDto {
  year: string
  month: string
}
