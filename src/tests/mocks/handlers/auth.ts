import { http, HttpResponse } from 'msw'
import { MOCK_LOGGED_USER_ID } from '../data/mockData'

/**
 * Authentication domain handlers
 * Handles login, logout, registration, and token refresh
 */
export const authHandlers = [
  /**
   * POST /api/auth/refresh - Token refresh
   */
  http.post('*/api/auth/refresh', () => {
    return HttpResponse.json({
      userId: MOCK_LOGGED_USER_ID,
      accessToken: 'new-fake-access-token-' + Date.now(),
    })
  }),

  /**
   * POST /api/auth/logout - User logout
   */
  http.post('*/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' })
  }),
]
