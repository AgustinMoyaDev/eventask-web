import { IEventSegment } from './event-segment'

export interface ScheduleProps {
  segmentsForDay: IEventSegment[]
  onRequestNextDay: () => void
}
