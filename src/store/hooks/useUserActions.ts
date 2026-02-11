import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/types/ui/table'

import {
  useFetchContactsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/services/userApi'
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

import { useAppSelector } from '../reduxStore'

/**
 * Custom hook for managing user-related state and operations
 * @returns User actions, data, loading states, and error handling
 */
export const useUserActions = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const { accessToken } = useAppSelector(state => state.auth)
  const canGetContacts = useMemo(() => {
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
    error: fetchUserContactsError,
    refetch: refetchContacts,
  } = useFetchContactsQuery(canGetContacts)

  const {
    data: user,
    isFetching: fetchingProfile,
    error: fetchProfileError,
    refetch: refetchProfile,
  } = useGetProfileQuery(accessToken ? undefined : skipToken)

  const [
    updateProfile,
    { isSuccess: updateSuccess, isLoading: updatingProfile, error: updateProfileError },
  ] = useUpdateProfileMutation()

  const [
    uploadAvatar,
    { isSuccess: uploadSuccess, isLoading: uploadingAvatar, error: uploadAvatarError },
  ] = useUploadAvatarMutation()

  const {
    fetch: fetchUserError,
    fetch: fetchContactsError,
    update: updateUserError,
    upload: uploadUserAvatarError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchProfileError },
        { operation: OperationError.FETCH, error: fetchUserContactsError },
        { operation: OperationError.UPDATE, error: updateProfileError },
        { operation: OperationError.UPLOAD, error: uploadAvatarError },
      ]),
    [fetchProfileError, fetchUserContactsError, updateProfileError, uploadAvatarError]
  )

  return {
    // RTKQ Data and flags
    user,
    contacts,
    total,
    fetching,
    fetchingProfile,
    updatingProfile,
    uploadingAvatar,
    refetchProfile,
    refetchContacts,
    // RTKQ mutations
    updateProfile,
    updateSuccess,
    uploadAvatar,
    uploadSuccess,
    // RTKQ parsed errors
    fetchUserError,
    fetchContactsError,
    updateUserError,
    uploadUserAvatarError,
  }
}
