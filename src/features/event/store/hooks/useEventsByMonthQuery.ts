import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useAppSelector } from '@/store/reduxStore'
import { useFetchEventsByMonthQuery } from '@/features/event/services/eventApi'

import { parseRTKError } from '@/services/utils/parseRTKError'

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
