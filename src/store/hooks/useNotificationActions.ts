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
import { SortConfig } from '@/types/ui/table'

/**
 * Custom hook for managing notification-related state and operations
 * Centralizes notification data, loading states, and error handling
 * @param page - Current page for pagination (default: 0)
 * @param perPage - Items per page (default: 5)
 * @param shouldFetch - Flag to determine if data should be fetched (default: true)
 * @param sortConfig - Sorting configuration for notifications (optional)
 * @returns Notification actions, data, loading states, and error handling
 */
export const useNotificationActions = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig,
  read?: boolean,
  type?: string
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const canGetNotifications = useMemo(() => {
    if (!accessToken || page < 0 || perPage <= 0 || !shouldFetch) {
      return skipToken
    }

    return {
      page,
      perPage,
      ...(read && { read }),
      ...(type && { type }),
      ...(sortConfig?.key &&
        sortConfig.direction && {
          sortBy: sortConfig.key,
          sortOrder: sortConfig.direction,
        }),
    }
  }, [accessToken, page, perPage, shouldFetch, sortConfig, read, type])

  // Query only execute if user is authenticated and parameters are valid
  const {
    data: { items: notifications = [], total = 0 } = {},
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
  const unreadCount = unreadCountData?.unreadCount ?? 0

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
    total,
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
