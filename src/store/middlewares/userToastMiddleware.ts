import { userApi } from '@/services/userApi'

import { registerToastFor } from './toastHelper'

const { getProfile, updateProfile, uploadAvatar } = userApi.endpoints

const getProfileOperation = {
  endpoints: {
    matchPending: getProfile.matchPending,
    matchFulfilled: getProfile.matchFulfilled,
    matchRejected: getProfile.matchRejected,
  },
  messages: {
    loading: 'Loading profile…',
    success: 'Profile loaded',
    error: 'Error loading profile',
  },
}

const updateProfileOperation = {
  endpoints: {
    matchPending: updateProfile.matchPending,
    matchFulfilled: updateProfile.matchFulfilled,
    matchRejected: updateProfile.matchRejected,
  },
  messages: {
    loading: 'Updating profile…',
    success: 'Profile updated successfully',
    error: 'Error updating profile',
  },
}

const uploadAvatarOperation = {
  endpoints: {
    matchPending: uploadAvatar.matchPending,
    matchFulfilled: uploadAvatar.matchFulfilled,
    matchRejected: uploadAvatar.matchRejected,
  },
  messages: {
    loading: 'Uploading avatar…',
    success: 'Avatar uploaded successfully',
    error: 'Error uploading avatar',
  },
}

const toastUserOperations = [getProfileOperation, updateProfileOperation, uploadAvatarOperation]

toastUserOperations.forEach(({ endpoints, messages }) => registerToastFor({ endpoints, messages }))
