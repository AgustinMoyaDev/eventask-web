import { EventSegment } from '@/features/event/types/event-segment.types'

export interface ScheduleProps {
  isToday: boolean
  segmentsForDay: EventSegment[]
  onRequestNextDay: () => void
}
