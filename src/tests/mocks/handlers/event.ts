import { delay, http, HttpResponse } from 'msw'

import { IEvent, IEventCalendarResult } from '@/types/IEvent'
import { IEventUpdatePayload, IEventStatusPayload } from '@/types/dtos/event'
import { createPaginatedResponse, getPaginationParams, recalculateTaskProgress } from './shared'
import { MOCK_EVENTS, MOCK_TASKS, MOCK_CONTACTS } from '../data/mockData'
import { DELAYS } from '../utils/delays'
import { calculateTaskDuration } from '../factories/taskFactory'

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
    const { page, perPage, sortBy, sortOrder } = getPaginationParams(url)
    const response = createPaginatedResponse<IEvent>(MOCK_EVENTS, page, perPage, sortBy, sortOrder)
    // Remove circular references from all events
    const cleanItems = response.items.map(({ task: _, ...evt }) => evt)
    return HttpResponse.json({ ...response, items: cleanItems })
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

    const cleanItems = response.events.map(({ task: _, ...evt }) => evt)
    return HttpResponse.json({ ...response, events: cleanItems })
  }),
  /**
   * PUT /api/events/:id - Update event
   */
  http.put('*/api/events/:id', async ({ request, params }) => {
    await delay(DELAYS.NORMAL)
    const { id } = params
    const body = (await request.json()) as IEventUpdatePayload

    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id)
    if (eventIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Event not found' }, { status: 404 })
    }

    const existingEvent = MOCK_EVENTS[eventIndex]

    const updatedEvent: IEvent = {
      ...existingEvent,
      title: body.title,
      start: body.start,
      end: body.end,
      notes: body.notes,
      updatedAt: new Date(),
    }

    MOCK_EVENTS[eventIndex] = updatedEvent

    // Update event in parent task
    if (existingEvent.taskId) {
      const taskIndex = MOCK_TASKS.findIndex(t => t.id === existingEvent.taskId)
      if (taskIndex !== -1) {
        const task = MOCK_TASKS[taskIndex]
        const taskEventIndex = task.events.findIndex(e => e.id === id)
        if (taskEventIndex !== -1) {
          task.events[taskEventIndex] = updatedEvent
          task.duration = calculateTaskDuration(task.events)
        }
      }
    }

    return HttpResponse.json(updatedEvent)
  }),
  /**
   * PATCH /api/events/:id/status - Update event status only
   */
  http.patch('*/api/events/:id/status', async ({ request, params }) => {
    await delay(DELAYS.FAST)
    const { id } = params
    const body = (await request.json()) as { status: IEventStatusPayload['status'] }

    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id)
    if (eventIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Event not found' }, { status: 404 })
    }

    const existingEvent = MOCK_EVENTS[eventIndex]

    // Update only status
    const updatedEvent: IEvent = {
      ...existingEvent,
      status: body.status,
      updatedAt: new Date(),
    }

    MOCK_EVENTS[eventIndex] = updatedEvent

    // Update in parent task
    if (existingEvent.taskId) {
      const taskIndex = MOCK_TASKS.findIndex(t => t.id === existingEvent.taskId)
      if (taskIndex !== -1) {
        const task = MOCK_TASKS[taskIndex]
        const taskEventIndex = task.events.findIndex(e => e.id === id)
        if (taskEventIndex !== -1) {
          task.events[taskEventIndex] = updatedEvent

          // Recalculate task progress based on events
          const { progress, status } = recalculateTaskProgress(task)
          task.progress = progress
          task.status = status
        }
      }
    }

    const { task: _, ...eventResponse } = updatedEvent

    return HttpResponse.json(eventResponse)
  }),
  /**
   * DELETE /api/events/:id - Delete event
   */
  http.delete('*/api/events/:id', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { id } = params

    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id)
    if (eventIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Event not found' }, { status: 404 })
    }

    const event = MOCK_EVENTS[eventIndex]

    // Remove from MOCK_EVENTS
    MOCK_EVENTS.splice(eventIndex, 1)

    // Remove from parent task
    if (event.taskId) {
      const taskIndex = MOCK_TASKS.findIndex(t => t.id === event.taskId)
      if (taskIndex !== -1) {
        const task = MOCK_TASKS[taskIndex]
        task.events = task.events.filter(e => e.id !== id)
        task.eventsIds = task.eventsIds.filter(eId => eId !== id)
        task.duration = calculateTaskDuration(task.events)
      }
    }

    return HttpResponse.json({ id: id as string })
  }),
  /**
   * PUT /api/events/:eventId/collaborators/:collaboratorId - Add collaborator to event
   */
  http.put('*/api/events/:eventId/collaborators/:collaboratorId', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { eventId, collaboratorId } = params

    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === eventId)
    if (eventIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Event not found' }, { status: 404 })
    }

    const collaborator = MOCK_CONTACTS.find(c => c.id === collaboratorId)
    if (!collaborator) {
      return HttpResponse.json({ ok: false, message: 'Collaborator not found' }, { status: 404 })
    }

    const event = MOCK_EVENTS[eventIndex]

    // Initialize collaborators array if not exists
    event.collaborators ??= []

    // Check if already a collaborator
    if (event.collaborators.some(c => c.id === collaboratorId)) {
      return HttpResponse.json(
        { ok: false, message: 'User is already a collaborator' },
        { status: 400 }
      )
    }

    // Add collaborator
    event.collaborators.push(collaborator)

    // Update in parent task
    if (event.taskId) {
      const taskIndex = MOCK_TASKS.findIndex(t => t.id === event.taskId)
      if (taskIndex !== -1) {
        const task = MOCK_TASKS[taskIndex]
        const taskEventIndex = task.events.findIndex(e => e.id === eventId)
        if (taskEventIndex !== -1) {
          task.events[taskEventIndex] = event
        }
      }
    }

    return new HttpResponse(null, { status: 200 })
  }),
  /**
   * DELETE /api/events/:eventId/collaborators/:collaboratorId - Remove collaborator from event
   */
  http.delete('*/api/events/:eventId/collaborators/:collaboratorId', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { eventId, collaboratorId } = params

    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === eventId)
    if (eventIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Event not found' }, { status: 404 })
    }

    const event = MOCK_EVENTS[eventIndex]

    if (!event.collaborators || event.collaborators.length === 0) {
      return HttpResponse.json(
        { ok: false, message: 'Event has no collaborators' },
        { status: 400 }
      )
    }

    const collaboratorIndex = event.collaborators.findIndex(c => c.id === collaboratorId)
    if (collaboratorIndex === -1) {
      return HttpResponse.json(
        { ok: false, message: 'Collaborator not found in event' },
        { status: 404 }
      )
    }

    event.collaborators.splice(collaboratorIndex, 1)

    // Update in parent task
    if (event.taskId) {
      const taskIndex = MOCK_TASKS.findIndex(t => t.id === event.taskId)
      if (taskIndex !== -1) {
        const task = MOCK_TASKS[taskIndex]
        const taskEventIndex = task.events.findIndex(e => e.id === eventId)
        if (taskEventIndex !== -1) {
          task.events[taskEventIndex] = event
        }
      }
    }

    return new HttpResponse(null, { status: 200 })
  }),
]
