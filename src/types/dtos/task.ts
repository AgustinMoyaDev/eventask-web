import { IEventForm } from '../IEvent'

export interface ITaskCreatePayload {
  title: string
  categoryId: string
  events: IEventForm[]
  participantsIds: string[]
}

export interface ITaskUpdatePayload extends ITaskCreatePayload {
  id: string
}
