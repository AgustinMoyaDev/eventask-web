import { Dayjs } from 'dayjs'

import { IEvent } from '../IEvent'
import { IUser } from '../IUser'

export interface IEventSegment extends Omit<IEvent, 'start' | 'end'> {
  start: Dayjs
  end: Dayjs
  duration: number
  isStartSegment: boolean
  isEndSegment: boolean
  collaborators: IUser[]
}
