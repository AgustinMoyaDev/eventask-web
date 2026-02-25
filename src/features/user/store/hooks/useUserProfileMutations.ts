import { useMemo } from 'react'

import { useUpdateProfileMutation, useUploadAvatarMutation } from '@/features/user/services/userApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

export const useUserProfileMutations = () => {
  const [
    updateProfile,
    { isSuccess: updateSuccess, isLoading: updatingProfile, error: updateProfileError },
  ] = useUpdateProfileMutation()

  const [
    uploadAvatar,
    { isSuccess: uploadSuccess, isLoading: uploadingAvatar, error: uploadAvatarError },
  ] = useUploadAvatarMutation()

  const errors = useMemo(() => {
    const rawErrors = {
      updateProfile: updateProfileError,
      updateAvatar: uploadAvatarError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [updateProfileError, uploadAvatarError])

  return {
    updateProfile,
    uploadAvatar,
    updatingProfile,
    updateSuccess,
    uploadSuccess,
    uploadingAvatar,
    errors,
  }
}
