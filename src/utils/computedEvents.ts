import dayjs, { Dayjs } from 'dayjs'

import { IEvent } from '../types/IEvent'
import { IEventSegment } from '../types/ui/event-segment'

/**
 * Split events into one or two segments:
 * - single-day events produce one segment with isStartSegment=true
 * - overnight events produce:
 *   • a first-day segment (isStartSegment=true)
 *   • a second-day segment (isStartSegment=false)
 */
export const getEventsSegments = (events: IEvent[] = []): IEventSegment[] => {
  const segments: IEventSegment[] = []
  if (!events.length) return segments

  events.forEach(evt => {
    const start = dayjs(evt.start)
    const end = dayjs(evt.end)

    // single event segment
    if (end.isSame(start, 'day')) {
      segments.push(makeSegment(evt, start, end, false, false))
    } else {
      // first event segment
      const endOfDay = start.endOf('day')
      segments.push(makeSegment(evt, start, endOfDay, true, false))
      // overnight: second event segment
      const startOfNextDay = end.startOf('day')
      segments.push(makeSegment(evt, startOfNextDay, end, false, true))
    }
  })

  return segments
}

const makeSegment = (
  event: IEvent,
  start: Dayjs,
  end: Dayjs,
  isStart: boolean,
  isEnd: boolean
): IEventSegment => {
  const minutes = end.diff(start, 'minutes', true)
  const duration = minutes / 60

  return {
    id: event.id,
    title: event.title,
    status: event.status,
    notes: event.notes,
    start,
    end,
    duration,
    isStartSegment: isStart,
    isEndSegment: isEnd,
    collaborators: event.collaborators ?? [],
    createdBy: event.createdBy,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  }
}

export const getHoursSchedule = (segments: IEventSegment[]) => {
  if (!segments.length) {
    const now = dayjs().hour()
    return [now, now + 1, now + 2]
  }

  const minHStart = 24
  const maxHEnd = 0
  const hours = segments.reduce<[number, number]>(
    ([minH, maxH], evt) => {
      const start = dayjs(evt.start).hour()
      const end = dayjs(evt.end).hour()
      return [Math.min(minH, start), Math.max(maxH, end)]
    },
    [minHStart, maxHEnd]
  )
  const [startH, endH] = hours
  const arrayHours = createInclusiveArray(startH, endH)
  // Add an extra hour before the start (if startH > 0) and after the end
  // (if endH < 24) so the timeline has some padding for better UX
  if (startH > 0) {
    arrayHours.unshift(startH - 1)
  }
  if (endH < 23) {
    arrayHours.push(endH + 1)
  }
  // remove possible duplicates
  const uniqueHours = Array.from(new Set(arrayHours))
  return uniqueHours
}

const createInclusiveArray = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
