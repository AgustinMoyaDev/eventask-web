import dayjs, { Dayjs } from 'dayjs'

import { Event } from '@/types/entities/event'

import { EventSegment } from '../../types/ui/event-segment'

const makeSegment = (
  event: Event,
  start: Dayjs,
  end: Dayjs,
  isStart: boolean,
  isEnd: boolean
): EventSegment => {
  const minutes = end.diff(start, 'minutes', true)
  const duration = minutes / 60

  return {
    id: event.id,
    taskId: event.taskId,
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

const createInclusiveArray = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export const getHoursSchedule = (segments: EventSegment[]) => {
  if (!segments.length) {
    const now = dayjs().hour()
    // Show 2 hours before and 2 hours after current time when no events
    const start = Math.max(0, now - 2)
    const end = Math.min(23, now + 2)
    return createInclusiveArray(start, end)
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
  // Add padding hours before and after events for better context
  const paddingBefore = 2 // Hours to show before first event
  const paddingAfter = 2 // Hours to show after last event

  // Add hours before (respecting 0 as minimum)
  for (let i = 1; i <= paddingBefore; i++) {
    const hour = startH - i
    if (hour >= 0) {
      arrayHours.unshift(hour)
    }
  }

  // Add hours after (respecting 23 as maximum)
  for (let i = 1; i <= paddingAfter; i++) {
    const hour = endH + i
    if (hour <= 23) {
      arrayHours.push(hour)
    }
  }

  // remove possible duplicates
  const uniqueHours = Array.from(new Set(arrayHours))
  return uniqueHours
}

/**
 * Split events into one or two segments:
 * - single-day events produce one segment with isStartSegment=true
 * - overnight events produce:
 *   • a first-day segment (isStartSegment=true)
 *   • a second-day segment (isStartSegment=false)
 */
export const getEventsSegments = (events: Event[] = []): EventSegment[] => {
  const segments: EventSegment[] = []
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
