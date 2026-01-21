import { IEventSegment } from './event-segment'

export interface ScheduleProps {
  isToday: boolean
  segmentsForDay: IEventSegment[]
  onRequestNextDay: () => void
}
