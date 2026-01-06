import { http, HttpResponse } from 'msw'

import type { INotification } from '@/types/INotification'

import { createFakeNotifications } from '../factories/notificationFactory'

import { createPaginatedResponse, getPaginationParams } from './shared'

export const notificationHandlers = [
  /**
   * GET /api/notifications - Returns paginated notifications
   * Supports query params: page, perPage, sortBy, sortOrder
   */
  http.get('*/api/notifications', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage } = getPaginationParams(url)

    const allNotifications = createFakeNotifications(10)
    const response = createPaginatedResponse<INotification>(allNotifications, page, perPage)

    return HttpResponse.json(response)
  }),

  /**
   * GET /api/notifications/unread-count - Returns unread notification count
   */
  http.get('*/api/notifications/unread-count', () => {
    return HttpResponse.json({
      unreadCount: 5,
    })
  }),
]
