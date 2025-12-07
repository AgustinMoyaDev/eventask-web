import { baseApi } from './baseApi'

import { INotification, INotificationQueryOptions } from '../types/INotification'

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
    getUserNotifications: builder.query<INotification[], INotificationQueryOptions>({
      query: ({ limit = 10, offset = 0, read, type } = {}) => ({
        url: '/notifications',
        method: 'GET',
        params: { limit, offset, ...(read !== undefined && { read }), ...(type && { type }) },
      }),
      providesTags: (result = []) => {
        return [
          { type: 'Notification', id: 'LIST' },
          ...result.map(n => ({ type: 'Notification' as const, id: n.id })),
        ]
      },
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
