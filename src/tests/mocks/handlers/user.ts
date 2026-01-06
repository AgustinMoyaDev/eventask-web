import { http, HttpResponse } from 'msw'

import { IUser } from '@/types/IUser'

import { createPaginatedResponse, getPaginationParams } from './shared'

import { MOCK_CONTACTS, MOCK_LOGGED_USER } from '../data/mockData'

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
    const { page, perPage } = getPaginationParams(url)
    const response = createPaginatedResponse<IUser>(MOCK_CONTACTS, page, perPage)
    return HttpResponse.json(response)
  }),
]
