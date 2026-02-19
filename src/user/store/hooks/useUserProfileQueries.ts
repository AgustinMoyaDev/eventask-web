import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { useGetProfileQuery } from '@/services/userApi'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useAppSelector } from '@/store/reduxStore'

export const useUserProfileQueries = () => {
  const { accessToken } = useAppSelector(state => state.auth)

  const {
    data: user,
    isFetching: fetchingProfile,
    error: fetchProfileRawError,
    refetch: refetchProfile,
  } = useGetProfileQuery(accessToken ? undefined : skipToken)

  const fetchUserError = useMemo(() => parseRTKError(fetchProfileRawError), [fetchProfileRawError])

  return {
    user,
    fetchingProfile,
    refetchProfile,
    fetchUserError,
  }
}
