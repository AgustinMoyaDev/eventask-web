import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useFetchEventsByMonthQuery } from '@/services/eventApi'
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

import { useAppSelector } from '@/store/reduxStore'

/**
 * Fetch Events by Month Hook
 *
 * Retrieves all events for a specific month and year.
 * Used by calendar views to display events on specific days.
 *
 * @param year - Year to fetch events for
 * @param month - Month to fetch (1-12)
 * @param shouldFetch - Conditional fetching flag
 *
 * @example
 * ```tsx
 * const { events, isFetching } = useEventsByMonth(2026, 2)
 * ```
 */
export const useEventsByMonth = (year: number, month: number, shouldFetch = true) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const queryParams = useMemo(() => {
    if (!accessToken || !shouldFetch || year === 0 || month === 0) {
      return skipToken
    }
    return { year: String(year), month: String(month) }
  }, [accessToken, shouldFetch, year, month])

  const {
    data: { events = [] } = {},
    isFetching,
    error,
    refetch,
  } = useFetchEventsByMonthQuery(queryParams)

  const { fetch: fetchError } = useMemo(
    () => getErrorMessage([{ operation: OperationError.FETCH, error }]),
    [error]
  )

  return {
    events,
    isFetching,
    fetchError,
    refetch,
  }
}
