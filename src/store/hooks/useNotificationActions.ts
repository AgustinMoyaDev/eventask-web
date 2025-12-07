import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import {
  useGetUserNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from '@/services/notificationApi'
import { getErrorMessage, OperationError } from '@/api/helpers/getErrorMessage'

import { useAppSelector } from '../reduxStore'
/**
 * Custom hook for managing notification-related state and operations
 * Centralizes notification data, loading states, and error handling
 * @param page - Current page for pagination (default: 1)
 * @param limit - Items per page (default: 10)
 * @param filters - Optional filters for notifications
 * @returns Notification actions, data, loading states, and error handling
 */
export const useNotificationActions = (
  page: number = 1,
  limit: number = 10,
  shouldFetch: boolean = true,
  filters?: { read?: boolean; type?: string }
) => {
  const { accessToken } = useAppSelector(state => state.auth)
  // Convert page-based pagination to offset-based for backend compatibility
  const offset = (page - 1) * limit

  const canGetNotifications =
    accessToken && limit > 0 && offset >= 0 && shouldFetch
      ? { limit, offset, ...filters }
      : skipToken

  // Query only execute if user is authenticated and parameters are valid
  const {
    data: notifications = [],
    isFetching: fetchingNotifications,
    error: fetchNotificationsError,
    refetch: refetchNotifications,
  } = useGetUserNotificationsQuery(canGetNotifications)

  const {
    data: unreadCountData,
    isFetching: fetchingUnreadCount,
    error: fetchUnreadCountError,
    refetch: refetchUnreadCount,
  } = useGetUnreadCountQuery(accessToken ? undefined : skipToken)
  const unreadCount = unreadCountData?.unreadCount || 0

  const [
    markAsRead,
    { isLoading: markingAsRead, error: markAsReadError, isSuccess: markAsReadSuccess },
  ] = useMarkAsReadMutation()

  const [
    markAllAsRead,
    { isLoading: markingAllAsRead, error: markAllAsReadError, isSuccess: markAllAsReadSuccess },
  ] = useMarkAllAsReadMutation()

  const {
    fetch: fetchNotificationError,
    fetchCount: fetchUnreadCountErrors,
    markRead: markAsReadErrors,
    markAllRead: markAllAsReadErrors,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchNotificationsError },
        { operation: OperationError.FETCH_COUNT, error: fetchUnreadCountError },
        { operation: OperationError.MARK_READ, error: markAsReadError },
        { operation: OperationError.MARK_ALL_READ, error: markAllAsReadError },
      ]),
    [fetchNotificationsError, fetchUnreadCountError, markAsReadError, markAllAsReadError]
  )

  return {
    // Data
    notifications,
    unreadCount,
    // Loading states
    fetchingNotifications,
    fetchingUnreadCount,
    markingAsRead,
    markingAllAsRead,
    // Success states
    markAsReadSuccess,
    markAllAsReadSuccess,
    // Actions
    markAsRead,
    markAllAsRead,
    refetchNotifications,
    refetchUnreadCount,
    // Errors
    fetchNotificationError,
    fetchUnreadCountErrors,
    markAsReadErrors,
    markAllAsReadErrors,
  }
}
