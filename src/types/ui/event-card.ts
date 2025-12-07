import { IEventLocal } from '../IEvent'

export interface EventCardProps {
  event: IEventLocal
  onEdit: (evt: IEventLocal) => void
  onDelete: (evtId: string) => void
}
