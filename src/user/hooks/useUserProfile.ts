import { skipToken } from '@reduxjs/toolkit/query'
import { useMemo } from 'react'

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/services/userApi'
import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

import { useAppSelector } from '@/store/reduxStore'

/**
 * User Profile Hook
 *
 * Manages authenticated user's profile (fetch, update, avatar upload).
 * Use this for user settings/profile pages.
 *
 * @example
 * ```tsx
 * const { user, updateProfile, uploadAvatar } = useUserProfile()
 * ```
 */
export const useUserProfile = () => {
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
    refetchProfile,
    // RTKQ mutations
    updatingProfile,
    updateSuccess,
    updateProfile,
    uploadSuccess,
    uploadingAvatar,
    uploadAvatar,
    // RTKQ parsed errors
    fetchUserError,
    updateUserError,
    uploadUserAvatarError,
  }
}
