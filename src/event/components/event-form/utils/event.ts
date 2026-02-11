import dayjs, { Dayjs } from 'dayjs'

import { EventFormModel } from '@/types/models/event.model'

/**
 * Formats a date (Date, ISO string or Dayjs) to the 'yyyy-MM-ddTHH:mm' format,
 * required by <input type="datetime-local">.
 * If you pass in a Dayjs instance, it uses it directly.
 * @param date - The date to format.
 * @returns A properly formatted string or an empty string if the date is not valid.
 */
export const formatToDatetimeLocal = (date: Date | string | Dayjs): string => {
  if (!date) return ''
  const parsed: Dayjs = dayjs.isDayjs(date) ? date : dayjs(date)
  if (!parsed.isValid()) return ''
  return parsed.format('YYYY-MM-DDTHH:mm')
}

/**
 * Round up to the next quarter of an hour
 *  @returns Dayjs
 */
function ceilToQuarter(now: Dayjs): Dayjs {
  const m = now.minute()
  const rem = m % 15
  const toAdd = rem === 0 ? 0 : 15 - rem
  return now.add(toAdd, 'minute').second(0).millisecond(0)
}

function getLastEndDate(events: EventFormModel[]) {
  const initialValue = events[0].end
  const lastEnd = events.reduce((latest, event) => {
    const eventEnd = dayjs(event.end)
    return eventEnd.isAfter(latest) ? eventEnd : latest
  }, dayjs(initialValue))
  return lastEnd
}

/**
 * Return the next rounded date-time of event, based on last event's end date-time.
 * @param events - Form events.
 * @returns Today's date-time string (YYYY-MM-DDTHH:mm) if events is an empty array, or the next rounded date-time otherwise.
 */
export const getNextStartDate = (events: EventFormModel[] = []): string => {
  const now = dayjs()
  const eventExists = events.length > 0

  if (eventExists) {
    const lastEndDate = getLastEndDate(events)
    const roundedLastEnd = ceilToQuarter(lastEndDate)
    return roundedLastEnd.format('YYYY-MM-DDTHH:mm')
  }

  const nextRounded = ceilToQuarter(now).format('YYYY-MM-DDTHH:mm')
  return nextRounded
}

/**
 * Checks for time collisions
 */
export function hasOverlap(
  newStart: string,
  newEnd: string,
  existingEvents: EventFormModel[],
  editingId?: string
): boolean {
  const s = dayjs(newStart)
  const e = dayjs(newEnd)

  return existingEvents.some(evt => {
    if (evt.id === editingId) return false
    const evtStart = dayjs(evt.start)
    const evtEnd = dayjs(evt.end)
    return s.isBefore(evtEnd) && e.isAfter(evtStart)
  })
}
