import { EventSegment } from './event-segment'

export interface ScheduleEventProps {
  initialLocation: number
  rowHeight: number
  labelHeight: number
  segment: EventSegment
  index: number
  requestNextDay: () => void
}
