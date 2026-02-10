import { EventFormModel } from '../models/event.model'

export interface EventCardProps {
  event: EventFormModel
  onEdit: (evt: EventFormModel) => void
  onDelete: (evtId: string) => void
}
