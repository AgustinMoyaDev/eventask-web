import { Dayjs } from 'dayjs'

import { Event } from '@/types/entities/event'
import { User } from '@/types/entities/user'

export interface EventSegment extends Omit<Event, 'start' | 'end'> {
  start: Dayjs
  end: Dayjs
  duration: number
  isStartSegment: boolean
  isEndSegment: boolean
  collaborators: User[]
}
