import { http, HttpResponse } from 'msw'

import { IEvent, IEventCalendarResult } from '@/types/IEvent'
import { createPaginatedResponse, getPaginationParams } from './shared'
import { MOCK_EVENTS } from '../data/mockData'

/**
 * Parse calendar query params from URL
 */
function getCalendarEventsParams(url: URL) {
  const year = parseInt(url.searchParams.get('year') ?? String(new Date().getFullYear()))
  const month = parseInt(url.searchParams.get('month') ?? String(new Date().getMonth() + 1))

  if (month < 1 || month > 12) {
    HttpResponse.json({ error: 'Month must be between 1 and 12' }, { status: 400 })
  }

  if (year < 1900 || year > 2100) {
    HttpResponse.json({ error: 'Year must be between 1900 and 2100' }, { status: 400 })
  }
  return { year, month }
}

/**
 * Filter events by year and month
 */
function filterEventsByMonth(events: IEvent[], year: number, month: number): IEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.start)
    return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month
  })
}

export const eventHandlers = [
  http.get('*api/events', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage } = getPaginationParams(url)
    const response = createPaginatedResponse(MOCK_EVENTS, page, perPage)
    return HttpResponse.json(response)
  }),

  http.get('*api/events/calendar', ({ request }) => {
    const url = new URL(request.url)
    const { year, month } = getCalendarEventsParams(url)
    const filteredEvents = filterEventsByMonth(MOCK_EVENTS, year, month)
    const response: IEventCalendarResult = {
      events: filteredEvents,
      year,
      month,
      total: filteredEvents.length,
    }

    return HttpResponse.json(response)
  }),
]
