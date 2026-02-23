import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/components/table/table.types'

import { useFetchCategoriesQuery } from '@/features/category/services/categoryApi'
import { useAppSelector } from '@/store/reduxStore'
import { parseRTKError } from '@/services/utils/parseRTKError'

/**
 * Category List Hook
 *
 * Provides read-only access to category data from the API.
 * Handles pagination, sorting, and conditional fetching.
 *
 * @param page - Current page number (default: 1)
 * @param perPage - Items per page (default: 5)
 * @param shouldFetch - Enable/disable fetch (default: true)
 * @param sortConfig - Optional sorting configuration
 *
 * @example
 * ```tsx
 * // Paginated list
 * const { categories, total, isFetching } = useCategoryList(1, 10, true)
 *
 * // All categories with task count
 * const { categoriesWithTaskCount } = useCategoryList()
 * ```
 */
export const useCategoryList = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  // Conditional fetch params for paginated query
  const categoriesQueryParams = useMemo(() => {
    if (!accessToken || !shouldFetch || page < 1 || perPage <= 0) return skipToken

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

  // Paginated categories query
  const {
    data: { items: categories = [], total = 0 } = {},
    isFetching,
    error: fetchError,
    refetch,
  } = useFetchCategoriesQuery(categoriesQueryParams)

  const fetchCategoryError = useMemo(() => parseRTKError(fetchError), [fetchError])

  return {
    categories,
    total,
    isFetching,
    fetchCategoryError,
    refetch,
  }
}
