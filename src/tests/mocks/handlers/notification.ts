import { delay, http, HttpResponse } from 'msw'

import type { INotification } from '@/types/INotification'

import { createPaginatedResponse, getPaginationParams } from './shared'
import { MOCK_NOTIFICATIONS } from '../data/mockData'
import { DELAYS } from '../utils/delays'

export const notificationHandlers = [
  /**
   * GET /api/notifications - Returns paginated notifications
   * Supports query params: page, perPage, sortBy, sortOrder
   */
  http.get('*/api/notifications', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage, sortBy, sortOrder } = getPaginationParams(url)

    const response = createPaginatedResponse<INotification>(
      MOCK_NOTIFICATIONS,
      page,
      perPage,
      sortBy,
      sortOrder
    )

    return HttpResponse.json(response)
  }),

  /**
   * GET /api/notifications/unread-count - Returns unread notification count
   */
  http.get('*/api/notifications/unread-count', () => {
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length
    return HttpResponse.json({ unreadCount })
  }),
  /**
   * PUT /api/notifications/:id/read - Mark notification as read
   */
  http.put('*/api/notifications/:id/read', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { id } = params

    const notificationIndex = MOCK_NOTIFICATIONS.findIndex(n => n.id === id)
    if (notificationIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Notification not found' }, { status: 404 })
    }

    // Mark as read
    MOCK_NOTIFICATIONS[notificationIndex].read = true
    MOCK_NOTIFICATIONS[notificationIndex].updatedAt = new Date()

    return HttpResponse.json(MOCK_NOTIFICATIONS[notificationIndex])
  }),
  /**
   * PUT /api/notifications/mark-all-read - Mark all notifications as read
   */
  http.put('*/api/notifications/mark-all-read', async () => {
    await delay(DELAYS.NORMAL)

    // Mark all as read
    MOCK_NOTIFICATIONS.forEach(notification => {
      notification.read = true
      notification.updatedAt = new Date()
    })

    return HttpResponse.json({ message: 'All notifications marked as read' })
  }),
]
