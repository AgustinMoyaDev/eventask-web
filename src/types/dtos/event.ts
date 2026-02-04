import { EventStatus, EventForm } from '../IEvent'

export interface IEventCreatePayload extends EventForm {
  taskId: string
}

export interface IEventUpdatePayload extends EventForm {
  id: string
  status: EventStatus
}

export interface IEventStatusPayload {
  id: string
  status: EventStatus
}
