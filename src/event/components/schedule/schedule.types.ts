import { EventSegment } from '@/event/types/event-segment.types'

export interface ScheduleProps {
  isToday: boolean
  segmentsForDay: EventSegment[]
  onRequestNextDay: () => void
}
