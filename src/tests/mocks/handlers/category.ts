import { http, HttpResponse } from 'msw'

import { ICategory } from '@/types/ICategory'

import { createPaginatedResponse, getPaginationParams } from './shared'

import { MOCK_CATEGORIES, MOCK_CATEGORIES_TASK_COUNT } from '../data/mockData'

export const categoryHandlers = [
  /**
   * GET /api/categories - Returns paginated categories
   */
  http.get('*/api/categories', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage } = getPaginationParams(url)
    const response = createPaginatedResponse<ICategory>(MOCK_CATEGORIES, page, perPage)
    return HttpResponse.json(response)
  }),

  /**
   * GET /api/categories/task-count - Returns categories with task count
   */
  http.get('*/api/categories/task-count', () => {
    return HttpResponse.json(MOCK_CATEGORIES_TASK_COUNT)
  }),
]
