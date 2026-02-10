import { EventForm, IEventLocal } from '../IEvent'

export interface EventCardListProps {
  events: IEventLocal[]
  onOpenNewEventModal: () => void
  onOpenEditEventModal: (evt: EventForm) => void
  onDelete: (evtId: string) => void
  eventsValid?: boolean
}
