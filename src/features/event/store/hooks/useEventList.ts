import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/components/table/table.types'
import { useAppSelector } from '@/store/reduxStore'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useFetchEventsByUserQuery } from '@/features/event/services/eventApi'

export const useEventList = (
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
