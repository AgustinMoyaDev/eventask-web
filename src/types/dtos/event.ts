import { EventStatus, IEventForm } from '../IEvent'

export interface IEventCreatePayload extends IEventForm {
  taskId: string
}

export interface IEventUpdatePayload extends IEventForm {
  id: string
  status: EventStatus
}

export interface IEventStatusPayload {
  id: string
  status: EventStatus
}
