import { EventFormModel } from '@/types/models/event.model'

export interface EventCardListProps {
  events: EventFormModel[]
  onOpenEditEventModal: (evt: EventFormModel) => void
  onDelete: (evtId: string) => void
}
