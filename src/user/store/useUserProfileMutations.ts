import { useMemo } from 'react'

import { useUpdateProfileMutation, useUploadAvatarMutation } from '@/services/userApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

export const useUserProfileMutations = () => {
  const [
    updateProfile,
    { isSuccess: updateSuccess, isLoading: updatingProfile, error: updateProfileRawError },
  ] = useUpdateProfileMutation()

  const [
    uploadAvatar,
    { isSuccess: uploadSuccess, isLoading: uploadingAvatar, error: uploadAvatarRawError },
  ] = useUploadAvatarMutation()

  const updateUserError = useMemo(
    () => parseRTKError(updateProfileRawError),
    [updateProfileRawError]
  )
  const uploadUserAvatarError = useMemo(
    () => parseRTKError(uploadAvatarRawError),
    [uploadAvatarRawError]
  )

  return {
    updatingProfile,
    updateSuccess,
    updateProfile,
    uploadSuccess,
    uploadingAvatar,
    uploadAvatar,
    updateUserError,
    uploadUserAvatarError,
  }
}
