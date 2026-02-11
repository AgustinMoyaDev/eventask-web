import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useFetchEventsByMonthQuery } from '@/services/eventApi'
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

import { useAppSelector } from '../reduxStore'

export const useMonthlyEventsActions = (year: number, month: number, shouldFetch = true) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const canGetMonthlyEvents = useMemo(() => {
    if (!accessToken || !shouldFetch || year === 0 || month === 0) {
      return skipToken
    }
    return { year: String(year), month: String(month) }
  }, [accessToken, shouldFetch, year, month])

  const {
    data: { events: monthlyEvents = [] } = {},
    isFetching: fetchingMonthlyEvents,
    error: fetchMonthlyEventsError,
    refetch: refetchMonthlyEvents,
  } = useFetchEventsByMonthQuery(canGetMonthlyEvents)

  const fetchMonthlyEventsCalendarError = useMemo(
    () => getErrorMessage([{ operation: OperationError.FETCH, error: fetchMonthlyEventsError }]),
    [fetchMonthlyEventsError]
  )

  return {
    monthlyEvents,
    fetchingMonthlyEvents,
    fetchMonthlyEventsCalendarError,
    refetchMonthlyEvents,
  }
}
