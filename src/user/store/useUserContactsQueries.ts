import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/components/table/table.types'
import { useFetchContactsQuery } from '@/services/userApi'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useAppSelector } from '@/store/reduxStore'

export const useUserContactsQueries = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const queryParams = useMemo(() => {
    if (!accessToken || page < 1 || perPage <= 0 || !shouldFetch) {
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
    data: { items: contacts = [], total = 0 } = {},
    isFetching: fetching,
    error: fetchContactsRawError,
    refetch: refetchContacts,
  } = useFetchContactsQuery(queryParams)

  const fetchContactsError = useMemo(
    () => parseRTKError(fetchContactsRawError),
    [fetchContactsRawError]
  )

  return {
    contacts,
    total,
    fetching,
    refetchContacts,
    fetchContactsError,
  }
}
