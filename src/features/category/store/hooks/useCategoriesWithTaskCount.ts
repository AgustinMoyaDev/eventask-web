import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useAppSelector } from '@/store/reduxStore'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useGetCategoriesWithTaskCountQuery } from '@/features/category/services/categoryApi'

export const useCategoriesWithTaskCount = () => {
  const { accessToken } = useAppSelector(state => state.auth)

  const {
    data: categoriesWithTaskCount = [],
    isFetching,
    error: fetchRawError,
  } = useGetCategoriesWithTaskCountQuery(accessToken ? undefined : skipToken)

  const error = useMemo(() => parseRTKError(fetchRawError), [fetchRawError])

  return { categoriesWithTaskCount, isFetching, error }
}
