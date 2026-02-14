import { EventSegment } from '@/event/types/event-segment.types'

export interface ScheduleEventProps {
  initialLocation: number
  rowHeight: number
  labelHeight: number
  segment: EventSegment
  index: number
  requestNextDay: () => void
}
