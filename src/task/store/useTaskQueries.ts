import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/components/table/table.types'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useFetchTasksQuery } from '@/services/taskApi'
import { useAppSelector } from '@/store/reduxStore'

export const useTaskQueries = (
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
  }, [accessToken, page, perPage, shouldFetch, sortConfig])

  const {
    data: { items: tasks = [], total = 0 } = {},
    isFetching: fetching,
    error: fetchTaskRawError,
    refetch,
  } = useFetchTasksQuery(queryParams)

  const fetchTaskError = useMemo(() => parseRTKError(fetchTaskRawError), [fetchTaskRawError])

  return {
    tasks,
    total,
    fetching,
    refetch,
    fetchTaskError,
  }
}
