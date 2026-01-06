import { http, HttpResponse } from 'msw'

import type { ITask } from '@/types/ITask'

import { createPaginatedResponse, getPaginationParams } from './shared'
import { MOCK_TASKS } from '../data/mockData'

export const taskHandlers = [
  /**
   * GET /api/tasks - Returns paginated tasks
   * Supports query params: page, perPage, sortBy, sortOrder
   */
  http.get('*/api/tasks', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage } = getPaginationParams(url)
    const response = createPaginatedResponse<ITask>(MOCK_TASKS, page, perPage)
    return HttpResponse.json(response)
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

    return HttpResponse.json(task)
  }),
]
