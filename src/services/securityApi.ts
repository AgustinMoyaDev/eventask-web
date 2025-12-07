import { setCsrfToken } from '../store/slices/security/security'
import { baseApi } from './baseApi'

export const securityApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCsrfToken: builder.query<{ csrfToken: string }, void>({
      query: () => ({ url: '/security/csrf-token', method: 'GET' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCsrfToken(data.csrfToken))
        } catch {
          console.error('Failed to fetch CSRF token')
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetCsrfTokenQuery } = securityApi
