import { EventFormModel } from '../models/event.model'

export interface EventCardListProps {
  events: EventFormModel[]
  onOpenNewEventModal: () => void
  onOpenEditEventModal: (evt: EventFormModel) => void
  onDelete: (evtId: string) => void
  eventsValid?: boolean
}
