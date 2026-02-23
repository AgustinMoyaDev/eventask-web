import { http, HttpResponse, delay } from 'msw'

import { DELAYS } from '../utils/delays'
import { generateMockJWT } from '../utils/jwtMock'

import { LoginDto, ResetPasswordDto } from '@/types/dtos/auth.dto'

import { MOCK_CONTACTS, MOCK_LOGGED_USER, MOCK_SESSION } from '../data/mockData'
import { createFakeUser } from '../factories/userFactory'

/**
 * Authentication domain handlers
 * Handles login, logout, registration, and token refresh
 */
export const authHandlers = [
  /**
   * POST /api/auth/refresh - Token refresh
   */
  http.post('*/api/auth/refresh', async () => {
    await delay(DELAYS.FAST)

    if (!MOCK_SESSION.isAuthenticated || !MOCK_SESSION.user) {
      return HttpResponse.json({ message: 'No active session' }, { status: 401 })
    }

    // Generate new access token
    const newToken = generateMockJWT(MOCK_SESSION.user.id)

    // Update session token
    MOCK_SESSION.token = newToken

    return HttpResponse.json({
      userId: MOCK_SESSION.user.id,
      accessToken: newToken,
    })
  }),
  /**
   * POST /api/auth/login - User login
   */
  http.post('*/api/auth/login', async ({ request }) => {
    // Simulate network delay
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as LoginDto

    // In demo mode, any password works for demo user
    if (body.email === MOCK_LOGGED_USER.email) {
      // Generate mock JWT token
      const token = generateMockJWT(MOCK_LOGGED_USER.id)

      // Update session state
      MOCK_SESSION.isAuthenticated = true
      MOCK_SESSION.user = MOCK_LOGGED_USER
      MOCK_SESSION.token = token

      // Return auth response
      return HttpResponse.json({
        userId: MOCK_LOGGED_USER.id,
        accessToken: token,
      })
    }

    // Invalid credentials
    return HttpResponse.json({ ok: false, message: 'Invalid email or password' }, { status: 401 })
  }),
  /**
   * POST /api/auth/google - Google OAuth login
   */
  http.post('*/api/auth/google-login', async () => {
    await delay(DELAYS.NORMAL)

    // In demo mode, any credential works
    const token = generateMockJWT(MOCK_LOGGED_USER.id)

    MOCK_SESSION.isAuthenticated = true
    MOCK_SESSION.user = MOCK_LOGGED_USER
    MOCK_SESSION.token = token
    MOCK_LOGGED_USER.googleId = 'mock-google-id'

    return HttpResponse.json({
      userId: MOCK_LOGGED_USER.id,
      accessToken: token,
    })
  }),

  /**
   * POST /api/auth/change-password - Change existing password
   */
  http.post('*/api/auth/change-password', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as { currentPassword: string; newPassword: string }

    if (!MOCK_SESSION.isAuthenticated || !MOCK_SESSION.user) {
      return HttpResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 })
    }

    if (!MOCK_SESSION.user.hasManualPassword) {
      return HttpResponse.json(
        { ok: false, message: 'No password set. Use set password instead' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.currentPassword || !body.newPassword) {
      return HttpResponse.json(
        { ok: false, message: 'Current and new password are required' },
        { status: 400 }
      )
    }

    if (body.newPassword.length < 6) {
      return HttpResponse.json(
        { ok: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // In demo mode, any current password is valid
    return new HttpResponse(null, { status: 200 })
  }),
  /**
   * POST /api/auth/register - User registration
   */
  http.post('*/api/auth/register', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as {
      firstName: string
      lastName: string
      email: string
      password: string
    }

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.password) {
      return HttpResponse.json({ ok: false, message: 'All fields are required' }, { status: 400 })
    }

    // Check if email already exists (demo user)
    if (body.email === MOCK_LOGGED_USER.email) {
      return HttpResponse.json({ ok: false, message: 'Email already registered' }, { status: 409 })
    }

    const newUser = createFakeUser({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    })

    // Add to contacts (simulates database save)
    MOCK_CONTACTS.push(newUser)

    // Generate token for new user
    const token = generateMockJWT(newUser.id)

    // Auto-login after registration
    MOCK_SESSION.isAuthenticated = true
    MOCK_SESSION.user = newUser
    MOCK_SESSION.token = token

    return HttpResponse.json(
      {
        userId: newUser.id,
        accessToken: token,
      },
      { status: 201 }
    )
  }),
  /**
   * POST /api/auth/forgot-password - Request password reset
   */
  http.post('*/api/auth/forgot-password', async ({ request }) => {
    await delay(DELAYS.SLOW)
    const body = (await request.json()) as { email: string }

    if (!body.email) {
      return HttpResponse.json({ ok: false, message: 'Email is required' }, { status: 400 })
    }

    return new HttpResponse(null, { status: 200 })
  }),
  /**
   * POST /api/auth/reset-password - Reset password with token
   */
  http.post('*/api/auth/reset-password', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as ResetPasswordDto

    if (!body.token || !body.newPassword) {
      return HttpResponse.json(
        { ok: false, message: 'Token and new password are required' },
        { status: 400 }
      )
    }

    if (body.newPassword.length < 6) {
      return HttpResponse.json(
        { ok: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    return new HttpResponse(null, { status: 200 })
  }),
  /**
   * POST /api/auth/set-password - Set password for first time
   */
  http.post('*/api/auth/set-password', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as { newPassword: string }

    if (!MOCK_SESSION.isAuthenticated || !MOCK_SESSION.user) {
      return HttpResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 })
    }

    if (MOCK_SESSION.user.hasManualPassword) {
      return HttpResponse.json(
        { ok: false, message: 'Password already set. Use change password instead' },
        { status: 400 }
      )
    }

    if (!body.newPassword) {
      return HttpResponse.json({ ok: false, message: 'New password is required' }, { status: 400 })
    }

    if (body.newPassword.length < 6) {
      return HttpResponse.json(
        { ok: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Update user state
    MOCK_SESSION.user.hasManualPassword = true

    return new HttpResponse(null, { status: 200 })
  }),
  /**
   * POST /api/auth/logout - Logout current user
   */
  http.post('*/api/auth/logout', async () => {
    // Simulate network delay
    await delay(DELAYS.FAST)

    // Clear session state
    MOCK_SESSION.isAuthenticated = false
    MOCK_SESSION.user = null
    MOCK_SESSION.token = null

    return new HttpResponse(null, { status: 204 })
  }),
]
