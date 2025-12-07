import { IEventLocal } from '../IEvent'

export interface EventCardListProps {
  events: IEventLocal[]
  onOpenNewEventModal: () => void
  onOpenEditEventModal: (evt: IEventLocal) => void
  onDelete: (evtId: string) => void
  eventsValid?: boolean
}
