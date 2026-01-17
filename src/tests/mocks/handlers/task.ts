import { delay, http, HttpResponse } from 'msw'

import type { ITask } from '@/types/ITask'
import { ITaskCreatePayload, ITaskUpdatePayload } from '@/types/dtos/task'
import { EVENT_STATUS, IEvent } from '@/types/IEvent'
import { IUser } from '@/types/IUser'

import { createPaginatedResponse, getPaginationParams } from './shared'
import {
  MOCK_CATEGORIES,
  MOCK_CONTACTS,
  MOCK_EVENTS,
  MOCK_LOGGED_USER,
  MOCK_TASKS,
} from '../data/mockData'
import { DELAYS } from '../utils/delays'
import { calculateTaskDuration, createFakeTask } from '../factories/taskFactory'

/**
 * Task domain handlers
 * Handles CRUD operations for tasks
 */
export const taskHandlers = [
  /**
   * GET /api/tasks - Returns paginated tasks
   * Supports query params: page, perPage, sortBy, sortOrder
   */
  http.get('*/api/tasks', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage, sortBy, sortOrder } = getPaginationParams(url)
    const response = createPaginatedResponse<ITask>(MOCK_TASKS, page, perPage, sortBy, sortOrder)

    // Remove circular references from all tasks
    const cleanItems = response.items.map(task => {
      const { events: taskEvents, ...taskResponse } = task
      const cleanEvents = taskEvents.map(({ task: _, ...evt }) => evt)
      return { ...taskResponse, events: cleanEvents }
    })

    return HttpResponse.json({ ...response, items: cleanItems })
  }),
  /**
   * GET /api/tasks/:id - Returns a specific task by ID
   */
  http.get('*/api/tasks/:id', ({ params }) => {
    const { id } = params
    const task = MOCK_TASKS.find(t => t.id === id)

    if (!task) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    // Remove circular references before returning
    const { events: taskEvents, ...taskResponse } = task
    const cleanEvents = taskEvents.map(({ task: _, ...evt }) => evt)

    return HttpResponse.json({ ...taskResponse, events: cleanEvents })
  }),
  /**
   * POST /api/tasks - Create new task
   */
  http.post('*/api/tasks', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as ITaskCreatePayload

    if (!body.title || !body.categoryId) {
      return HttpResponse.json(
        { ok: false, message: 'Title and category are required' },
        { status: 400 }
      )
    }

    const category = MOCK_CATEGORIES.find(c => c.id === body.categoryId)
    if (!category) {
      return HttpResponse.json({ ok: false, message: 'Category not found' }, { status: 404 })
    }

    const participants = body.participantsIds
      .map(id => MOCK_CONTACTS.find(c => c.id === id))
      .filter((user): user is IUser => user !== undefined)

    const events: IEvent[] = body.events.map(eventForm => ({
      id: crypto.randomUUID(),
      title: eventForm.title,
      start: eventForm.start,
      end: eventForm.end,
      notes: eventForm.notes,
      status: EVENT_STATUS.PENDING,
      createdBy: MOCK_LOGGED_USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    const newTask = createFakeTask({
      title: body.title,
      categoryId: body.categoryId,
      category,
      createdBy: MOCK_LOGGED_USER.id,
      creator: MOCK_LOGGED_USER,
      participantsIds: body.participantsIds,
      participants,
      events,
      eventsIds: events.map(e => e.id),
    })

    MOCK_TASKS.push(newTask)

    events.forEach(event => {
      MOCK_EVENTS.push({
        ...event,
        taskId: newTask.id,
        task: newTask,
      })
    })

    // Remove circular references before returning
    const { events: taskEvents, ...taskResponse } = newTask
    const cleanEvents = taskEvents.map(({ task: _, ...evt }) => evt)

    return HttpResponse.json({ ...taskResponse, events: cleanEvents }, { status: 201 })
  }),
  /**
   * PUT /api/tasks/:id - Update existing task
   */
  http.put('*/api/tasks/:id', async ({ request, params }) => {
    await delay(DELAYS.NORMAL)
    const { id } = params
    const body = (await request.json()) as ITaskUpdatePayload

    const taskIndex = MOCK_TASKS.findIndex(t => t.id === id)
    if (taskIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Task not found' }, { status: 404 })
    }

    const existingTask = MOCK_TASKS[taskIndex]

    const category = body.categoryId
      ? MOCK_CATEGORIES.find(c => c.id === body.categoryId)
      : existingTask.category

    const participants = body.participantsIds
      .map(id => MOCK_CONTACTS.find(c => c.id === id))
      .filter((user): user is IUser => user !== undefined)

    const currentEventsMap = new Map(existingTask.events.map(e => [e.id, e]))
    const newEventIds: string[] = []
    const updatedEvents: IEvent[] = []

    for (const eventForm of body.events) {
      if (eventForm.id && currentEventsMap.has(eventForm.id)) {
        // UPDATE: preserve collaborators and other fields
        const existingEvent = currentEventsMap.get(eventForm.id)!
        const updatedEvent: IEvent = {
          ...existingEvent,
          title: eventForm.title,
          start: eventForm.start,
          end: eventForm.end,
          notes: eventForm.notes,
          updatedAt: new Date(),
        }
        updatedEvents.push(updatedEvent)
        newEventIds.push(updatedEvent.id)
        currentEventsMap.delete(eventForm.id)

        // Update in MOCK_EVENTS
        const mockEventIndex = MOCK_EVENTS.findIndex(e => e.id === eventForm.id)
        if (mockEventIndex !== -1) {
          MOCK_EVENTS[mockEventIndex] = {
            ...updatedEvent,
            taskId: id as string,
            task: existingTask,
          }
        }
      } else {
        // CREATE: new event without collaborators
        const newEvent: IEvent = {
          id: crypto.randomUUID(),
          title: eventForm.title,
          start: eventForm.start,
          end: eventForm.end,
          notes: eventForm.notes,
          status: EVENT_STATUS.PENDING,
          createdBy: MOCK_LOGGED_USER,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        updatedEvents.push(newEvent)
        newEventIds.push(newEvent.id)

        // Add to MOCK_EVENTS
        MOCK_EVENTS.push({ ...newEvent, taskId: id as string, task: existingTask })
      }
    }

    const updatedTask = createFakeTask({
      ...existingTask,
      id: existingTask.id,
      title: body.title,
      categoryId: body.categoryId,
      category,
      participantsIds: body.participantsIds,
      participants,
      events: updatedEvents,
      eventsIds: newEventIds,
      updatedAt: new Date(),
      duration: calculateTaskDuration(updatedEvents),
    })

    MOCK_TASKS[taskIndex] = updatedTask

    // Remove circular references before returning
    const { events: taskEvents, ...taskResponse } = updatedTask
    const cleanEvents = taskEvents.map(({ task: _task, ...evt }) => evt)

    return HttpResponse.json({ ...taskResponse, events: cleanEvents })
  }),
  /**
   * DELETE /api/tasks/:id - Delete task and cascade delete events
   */
  http.delete('*/api/tasks/:id', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { id } = params

    const taskIndex = MOCK_TASKS.findIndex(t => t.id === id)
    if (taskIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Task not found' }, { status: 404 })
    }

    MOCK_TASKS.splice(taskIndex, 1)

    // Cascade delete: remove all events from this task
    for (let i = MOCK_EVENTS.length - 1; i >= 0; i--) {
      if (MOCK_EVENTS[i].taskId === id) {
        MOCK_EVENTS.splice(i, 1)
      }
    }

    return HttpResponse.json({ id: id as string })
  }),
]
