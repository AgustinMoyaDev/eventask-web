import { http, HttpResponse } from 'msw'

export const securityHandlers = [
  /**
   * GET /api/security/csrf-token - Returns CSRF token
   * Required by baseApi for secure requests
   */
  http.get('*/api/security/csrf-token', () => {
    return HttpResponse.json({ csrfToken: 'fake-csrf-token' })
  }),

  /**
   * GET /api/health - Server Warmup
   * Used by useServerWarmup hook
   */
  http.get('*/api/health', () => {
    return HttpResponse.json({ status: 'ok', uptime: 100 })
  }),
]
