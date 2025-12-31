/**
 * MSW Request Handlers
 * @see https://mswjs.io/docs/basics/request-handler
 */
import { http, HttpResponse } from 'msw'

import type { IPaginationResult } from '@/api/types/pagination'
import type { ITask } from '@/types/ITask'
import type { INotification } from '@/types/INotification'

import { createFakeTasks } from './factories/taskFactory'
import { createFakeNotifications } from './factories/notificationFactory'

/**
 * Helper function to parse pagination query params from URL.
 */
function getPaginationParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') ?? '1', 10)
  const perPage = parseInt(url.searchParams.get('perPage') ?? '10', 10)
  const sortBy = url.searchParams.get('sortBy') ?? 'createdAt'
  const sortOrder = (url.searchParams.get('sortOrder') ?? 'desc') as 'asc' | 'desc'

  return { page, perPage, sortBy, sortOrder }
}

/**
 * Helper function to create paginated response.
 */
function createPaginatedResponse<T>(
  allItems: T[],
  page: number,
  perPage: number
): IPaginationResult<T> {
  const total = allItems.length
  const totalPages = Math.ceil(total / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const items = allItems.slice(startIndex, endIndex)

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}

/**
 * Array of request handlers for MSW.
 * Add your API endpoint handlers here.
 */
export const handlers: ReturnType<typeof http.get>[] = [
  /**
   * GET /api/notifications/unread-count - Returns unread notification count
   */
  http.get('*/api/notifications/unread-count', () => {
    return HttpResponse.json({
      unreadCount: 5,
    })
  }),

  /**
   * GET /api/users/me - Returns user profile
   */
  http.get('*/api/users/me', () => {
    return HttpResponse.json({
      id: 'fake-user-id',
      username: 'fake-username',
      email: 'fake-email',
    })
  }),

  /**
   * GET /api/security/csrf-token - Returns CSRF token
   * Required by baseApi for secure requests
   */
  http.get('*/api/security/csrf-token', () => {
    return HttpResponse.json({ csrfToken: 'fake-csrf-token' })
  }),
  /**
   * GET /api/tasks - Returns paginated tasks
   * Supports query params: page, perPage, sortBy, sortOrder
   */
  http.get('*/api/tasks', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage } = getPaginationParams(url)

    const allTasks = createFakeTasks(50)
    const response = createPaginatedResponse<ITask>(allTasks, page, perPage)

    return HttpResponse.json(response)
  }),

  /**
   * GET /api/notifications - Returns paginated notifications
   * Supports query params: page, perPage, sortBy, sortOrder
   */
  http.get('*/api/notifications', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage } = getPaginationParams(url)

    const allNotifications = createFakeNotifications(30)
    const response = createPaginatedResponse<INotification>(allNotifications, page, perPage)

    return HttpResponse.json(response)
  }),
]
