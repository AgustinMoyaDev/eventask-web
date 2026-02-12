import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/types/ui/table'

import { useFetchContactsQuery } from '@/services/userApi'
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

import { useAppSelector } from '@/store/reduxStore'

/**
 * User Contacts Hook (Paginated)
 *
 * Fetches paginated list of user contacts with optional sorting.
 * Used by SeeAllPage for contacts table view.
 *
 * @param page - Current page (1-indexed)
 * @param perPage - Items per page
 * @param shouldFetch - Conditional fetching flag
 * @param sortConfig - Optional sorting configuration
 *
 * @example
 * ```tsx
 * const { contacts, total, fetching } = useUserContacts(1, 10, true, sortConfig)
 * ```
 */
export const useUserContacts = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  const queryParams = useMemo(() => {
    if (!accessToken || page < 0 || perPage <= 0 || !shouldFetch) {
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
    error: fetchContactsError,
    refetch: refetchContacts,
  } = useFetchContactsQuery(queryParams)

  const { fetch: fetchContactsErrorParsed } = useMemo(
    () => getErrorMessage([{ operation: OperationError.FETCH, error: fetchContactsError }]),
    [fetchContactsError]
  )

  return {
    contacts,
    total,
    fetching,
    refetchContacts,
    fetchContactsError: fetchContactsErrorParsed,
  }
}
