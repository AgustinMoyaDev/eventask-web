import { baseApi } from './baseApi'

import { INotification, INotificationQueryOptions } from '../types/INotification'
import { IPaginationResult } from '@/api/types/pagination'

/**
 * Notification API endpoints using RTK Query
 * Handles user notifications with pagination, read status, and badge count
 */
export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Get user notifications with pagination
     * @param params - Pagination parameters (limit, offset)
     */
    getUserNotifications: builder.query<
      IPaginationResult<INotification>,
      INotificationQueryOptions
    >({
      query: ({ page = 1, perPage = 10, sortBy, sortOrder, read, type } = {}) => ({
        url: '/notifications',
        method: 'GET',
        params: {
          page,
          perPage,
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder }),
          ...(read && { read }),
          ...(type && { type }),
        },
      }),
      providesTags: result => [
        { type: 'Notification', id: 'LIST' },
        ...(result?.items.map(({ id }) => ({ type: 'Notification' as const, id })) ?? []),
      ],
    }),
    /**
     * Get unread notifications count for badge display
     * @returns Object with unread count number
     */
    getUnreadCount: builder.query<{ unreadCount: number }, void>({
      query: () => ({
        url: '/notifications/unread-count',
        method: 'GET',
      }),
      providesTags: [{ type: 'Notification', id: 'UNREAD_COUNT' }],
    }),
    /**
     * Mark specific notification as read
     * @param notificationId - ID of notification to mark as read
     */
    markAsRead: builder.mutation<INotification, string>({
      query: notificationId => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: (_result, _error, notificationId) => [
        { type: 'Notification', id: notificationId },
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'UNREAD_COUNT' },
      ],
    }),
    /**
     * Mark all user notifications as read
     * @returns Success confirmation
     */
    markAllAsRead: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/notifications/mark-all-read',
        method: 'PUT',
      }),
      invalidatesTags: [
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'UNREAD_COUNT' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi
