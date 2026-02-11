import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUserActions } from '@/store/hooks/useUserActions'
import { useInvitationActions } from '@/store/hooks/useInvitationActions'

import { profileSchema, ProfileSchemaType } from './profileSchema'

/**
 * Custom hook for user profile form logic.
 *
 * Handles immediate avatar upload and deferred profile updates.
 * Uses RHF isDirty to track changes.
 *
 * @returns Form state, handlers, and loading states
 */
export const useProfileForm = () => {
  const {
    user,
    fetchingProfile,
    updatingProfile,
    uploadingAvatar,
    updateProfile,
    uploadAvatar,
    fetchUserError,
    updateUserError,
    uploadUserAvatarError,
  } = useUserActions()

  const { inviteContact, inviting, inviteContactError } = useInvitationActions()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  })

  // When 'user' data arrives from backend, we populate the form.
  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }
  }, [user, reset])

  const handleAvatarChange = async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    await uploadAvatar(formData)
  }

  const onSubmit = async (data: ProfileSchemaType) => {
    await updateProfile({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      profileImageURL: user?.profileImageURL ?? '',
    })

    reset(data)
  }

  const handleInviteContact = (email: string) => {
    inviteContact({ email })
  }

  const displayBackendError =
    fetchUserError?.message || updateUserError?.message || uploadUserAvatarError?.message

  return {
    // Data & State
    user,
    isLoading: fetchingProfile,
    isSaving: updatingProfile,
    isUploadingAvatar: uploadingAvatar,
    displayBackendError,

    // Form
    register,
    formErrors: errors,
    isFormValid: isValid,
    hasChanges: isDirty,
    handleSubmit: handleSubmit(onSubmit),

    // Actions
    handleAvatarChange,
    handleInviteContact,

    // Invitation State
    isInviting: inviting,
    inviteError: inviteContactError,
  }
}
