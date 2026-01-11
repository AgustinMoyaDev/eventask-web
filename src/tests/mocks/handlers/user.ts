import { delay, http, HttpResponse } from 'msw'

import { IUser } from '@/types/IUser'
import { IUpdateUserDto } from '@/types/dtos/user'

import { createPaginatedResponse, getPaginationParams } from './shared'

import { MOCK_CONTACTS, MOCK_LOGGED_USER } from '../data/mockData'
import { DELAYS } from '../utils/delays'

export const userHandlers = [
  /**
   * GET /api/users/me - Returns user profile
   */
  http.get('*/api/users/me', () => {
    return HttpResponse.json(MOCK_LOGGED_USER)
  }),
  /**
   * GET /api/users/me/contacts - Returns paginated contacts
   */
  http.get('*/api/users/me/contacts', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage, sortBy, sortOrder } = getPaginationParams(url)
    const response = createPaginatedResponse<IUser>(MOCK_CONTACTS, page, perPage, sortBy, sortOrder)
    return HttpResponse.json(response)
  }),
  /**
   * POST /api/users/me/avatar - Upload avatar image
   * Returns updated profileImageURL
   */
  http.post('*/api/users/me/avatar', async ({ request }) => {
    await delay(DELAYS.SLOW)
    const formData = await request.formData()
    const avatarFile = formData.get('avatar')

    if (!avatarFile || !(avatarFile instanceof File)) {
      return HttpResponse.json({ message: 'No avatar file provided' }, { status: 400 })
    }

    // Simulate upload success with fake URL
    const fakeImageUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${MOCK_LOGGED_USER.firstName}${MOCK_LOGGED_USER.lastName}`
    MOCK_LOGGED_USER.profileImageURL = fakeImageUrl

    return HttpResponse.json({ profileImageURL: fakeImageUrl })
  }),
  /**
   * PUT /api/users/me - Update user profile
   */
  http.put('*/api/users/me', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const updates = (await request.json()) as IUpdateUserDto

    if (updates.firstName !== undefined) MOCK_LOGGED_USER.firstName = updates.firstName
    if (updates.lastName !== undefined) MOCK_LOGGED_USER.lastName = updates.lastName

    return HttpResponse.json(MOCK_LOGGED_USER)
  }),
]
