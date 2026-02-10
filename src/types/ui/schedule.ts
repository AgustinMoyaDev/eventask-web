import { EventSegment } from './event-segment'

export interface ScheduleProps {
  isToday: boolean
  segmentsForDay: EventSegment[]
  onRequestNextDay: () => void
}
