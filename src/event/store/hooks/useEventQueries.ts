import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/components/table/table.types'
import { useAppSelector } from '@/store/reduxStore'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useFetchEventsByUserQuery, useFetchEventsByMonthQuery } from '@/services/eventApi'

export const useEventQueries = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const queryParams = useMemo(() => {
    if (!accessToken || !shouldFetch || page < 1 || perPage <= 0) {
      return skipToken
    }

    return {
      page,
      perPage,
      ...(sortConfig?.key &&
        sortConfig.direction && {
          sortBy: sortConfig.key,
          sortOrder: sortConfig.direction,
        }),
    }
  }, [accessToken, shouldFetch, page, perPage, sortConfig])

  const {
    data: { items: events = [], total = 0 } = {},
    isFetching: fetching,
    error: fetchEventsRawError,
    refetch,
  } = useFetchEventsByUserQuery(queryParams)

  const fetchEventsError = useMemo(() => parseRTKError(fetchEventsRawError), [fetchEventsRawError])

  return {
    events,
    total,
    fetching,
    refetch,
    fetchEventsError,
  }
}

export const useEventsByMonthQuery = (year: number, month: number, shouldFetch = true) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const queryParams = useMemo(() => {
    if (!accessToken || !shouldFetch || year <= 0 || month <= 0) {
      return skipToken
    }
    return { year: String(year), month: String(month) }
  }, [accessToken, shouldFetch, year, month])

  const {
    data: { events = [] } = {},
    isFetching,
    error: fetchEventsByMonthRawError,
    refetch,
  } = useFetchEventsByMonthQuery(queryParams)

  const fetchEventsByMonthError = useMemo(
    () => parseRTKError(fetchEventsByMonthRawError),
    [fetchEventsByMonthRawError]
  )

  return {
    events,
    isFetching,
    fetchEventsByMonthError,
    refetch,
  }
}
