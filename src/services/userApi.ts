import { baseApi } from './baseApi'

import { User } from '../types/entities/user'
import { IUpdateUserDto } from '../types/dtos/user'

import { PaginationOptions, PaginationResult } from '@/types/dtos/api/pagination'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
      providesTags: () => [{ type: 'User' }],
    }),
    fetchContacts: builder.query<PaginationResult<User>, PaginationOptions>({
      query: ({ page = 1, perPage = 10, sortBy, sortOrder } = {}) => ({
        url: '/users/me/contacts',
        method: 'GET',
        params: { page, perPage, ...(sortBy && { sortBy }), ...(sortOrder && { sortOrder }) },
      }),
      providesTags: result => [
        { type: 'User', id: 'LIST' },
        ...(result?.items.map(({ id }) => ({ type: 'User' as const, id })) ?? []),
      ],
    }),
    uploadAvatar: builder.mutation<{ profileImageURL: string }, FormData>({
      // FormData with key "avatar"
      query: formData => ({
        url: '/users/me/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation<User, IUpdateUserDto>({
      query: data => ({
        url: '/users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useFetchContactsQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = userApi
