import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useGetUserNotificationsQuery, useGetUnreadCountQuery } from '@/services/notificationApi'

import { useAppSelector } from '@/store/reduxStore'
import { SortConfig } from '@/components/table/table.types'
import { parseRTKError } from '@/services/utils/parseRTKError'

/**
 * Custom hook for managing notification-related state and operations
 * Centralizes notification data, loading states, and error handling
 * @param page - Current page for pagination (default: 0)
 * @param perPage - Items per page (default: 5)
 * @param shouldFetch - Flag to determine if data should be fetched (default: true)
 * @param sortConfig - Sorting configuration for notifications (optional)
 * @returns Notification actions, data, loading states, and error handling
 */
export const useNotificationQueries = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig,
  read?: boolean,
  type?: string
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const notificationsQueryParams = useMemo(() => {
    if (!accessToken || page < 0 || perPage <= 0 || !shouldFetch) return skipToken

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

  const {
    data: { items: notifications = [], total = 0 } = {},
    isFetching: fetchingNotifications,
    error: fetchNotificationsRawError,
    refetch: refetchNotifications,
  } = useGetUserNotificationsQuery(notificationsQueryParams)

  const fetchNotificationsError = parseRTKError(fetchNotificationsRawError)

  const {
    data: { unreadCount = 0 } = {},
    isFetching: fetchingUnreadCount,
    error: fetchUnreadCountRawError,
    refetch: refetchUnreadCount,
  } = useGetUnreadCountQuery(accessToken ? undefined : skipToken)

  const fetchUnreadCountError = parseRTKError(fetchUnreadCountRawError)

  return {
    // refetch functions
    refetchNotifications,
    refetchUnreadCount,
    // data
    notifications,
    total,
    unreadCount,
    // flags
    fetchingNotifications,
    fetchingUnreadCount,
    // errors
    fetchNotificationsError,
    fetchUnreadCountError,
  }
}
