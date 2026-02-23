import { delay, http, HttpResponse } from 'msw'

import type { Task } from '@/types/entities/task'
import { CreateTaskDto, UpdateTaskDto } from '@/types/dtos/task.dto'

import { createPaginatedResponse, getPaginationParams } from './shared'
import {
  MOCK_CATEGORIES,
  MOCK_CONTACTS,
  MOCK_EVENTS,
  MOCK_LOGGED_USER,
  MOCK_TASKS,
} from '../data/mockData'
import { DELAYS } from '../utils/delays'
import { createFakeTask } from '../factories/taskFactory'

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
    const response = createPaginatedResponse<Task>(MOCK_TASKS, page, perPage, sortBy, sortOrder)

    // Remove circular references from all tasks
    const cleanItems = response.items.map(task => {
      const { events: taskEvents = [], ...taskResponse } = task
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
    const { events: taskEvents = [], ...taskResponse } = task
    const cleanEvents = taskEvents.map(({ task: _, ...evt }) => evt)

    return HttpResponse.json({ ...taskResponse, events: cleanEvents })
  }),
  /**
   * POST /api/tasks - Create new task
   */
  http.post('*/api/tasks', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as CreateTaskDto

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

    const newTask = createFakeTask({
      title: body.title,
      categoryId: body.categoryId,
      category,
      createdBy: MOCK_LOGGED_USER.id,
      creator: MOCK_LOGGED_USER,
      events: [], // Start with empty events, they can be added later
      eventsIds: [],
      participants: [], // Start with empty participants, they can be added later
      participantsIds: [],
    })

    MOCK_TASKS.push(newTask)

    return HttpResponse.json(newTask, { status: 201 })
  }),
  /**
   * PUT /api/tasks/:id - Update existing task
   */
  http.put('*/api/tasks/:id', async ({ request, params }) => {
    await delay(DELAYS.NORMAL)
    const { id } = params
    const body = (await request.json()) as UpdateTaskDto

    const taskIndex = MOCK_TASKS.findIndex(t => t.id === id)
    if (taskIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Task not found' }, { status: 404 })
    }

    const existingTask = MOCK_TASKS[taskIndex]

    const category = body.categoryId
      ? MOCK_CATEGORIES.find(c => c.id === body.categoryId)
      : existingTask.category

    const updatedTask = {
      ...existingTask,
      id: existingTask.id,
      title: body.title,
      categoryId: body.categoryId,
      category,
      updatedAt: new Date().toISOString(),
    }

    MOCK_TASKS[taskIndex] = updatedTask

    return HttpResponse.json(updatedTask, { status: 200 })
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

  /**
   * POST /api/tasks/:taskId/participants/:participantId - Assign participant to task
   */
  http.post('*/api/tasks/:taskId/participants/:participantId', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { taskId, participantId } = params

    const task = MOCK_TASKS.find(t => t.id === taskId)
    if (!task) {
      return HttpResponse.json({ ok: false, message: 'Task not found' }, { status: 404 })
    }

    const participant = MOCK_CONTACTS.find(c => c.id === participantId)
    if (!participant) {
      return HttpResponse.json({ ok: false, message: 'Participant not found' }, { status: 404 })
    }

    task.participants?.push(participant)

    return HttpResponse.json({ ...task })
  }),

  /**
   * DELETE /api/tasks/:taskId/participants/:participantId - Remove participant from task
   */
  http.delete('*/api/tasks/:taskId/participants/:participantId', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { taskId, participantId } = params

    const task = MOCK_TASKS.find(t => t.id === taskId)
    if (!task) {
      return HttpResponse.json({ ok: false, message: 'Task not found' }, { status: 404 })
    }

    const participantIndex = task.participants?.findIndex(p => p.id === participantId)
    if (participantIndex === undefined || participantIndex === -1) {
      return HttpResponse.json(
        { ok: false, message: 'Participant not found in task' },
        { status: 404 }
      )
    }

    task.participants?.splice(participantIndex, 1)

    return HttpResponse.json({ ...task })
  }),
]
