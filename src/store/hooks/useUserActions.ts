import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/services/userApi'
import { getErrorMessage, OperationError } from '@/api/helpers/getErrorMessage'

import { useAppSelector } from '../reduxStore'

/**
 * Custom hook for managing user-related state and operations
 * @returns User actions, data, loading states, and error handling
 */
export const useUserActions = () => {
  const { accessToken } = useAppSelector(state => state.auth)

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
    update: updateUserError,
    upload: uploadUserAvatarError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchProfileError },
        { operation: OperationError.UPDATE, error: updateProfileError },
        { operation: OperationError.UPLOAD, error: uploadAvatarError },
      ]),
    [fetchProfileError, updateProfileError, uploadAvatarError]
  )

  return {
    // RTKQ Data and flags
    user,
    fetchingProfile,
    updatingProfile,
    uploadingAvatar,
    refetchProfile,
    // RTKQ mutations
    updateProfile,
    updateSuccess,
    uploadAvatar,
    uploadSuccess,
    // RTKQ parsed errors
    fetchUserError,
    updateUserError,
    uploadUserAvatarError,
  }
}
