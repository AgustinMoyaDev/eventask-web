import { IEventSegment } from './event-segment'

export interface ScheduleEventProps {
  initialLocation: number
  rowHeight: number
  labelHeight: number
  segment: IEventSegment
  index: number
  requestNextDay: () => void
}
