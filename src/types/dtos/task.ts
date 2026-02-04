import { EventForm } from '../IEvent'

export interface ITaskCreatePayload {
  title: string
  categoryId: string
  events: EventForm[]
  participantsIds: string[]
}

export interface ITaskUpdatePayload extends ITaskCreatePayload {
  id: string
}
