import { useMemo } from 'react'

import { parseRTKError } from '@/services/utils/parseRTKError'
import {
  useInviteContactMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from '@/features/invitation/services/invitationApi'

/**
 * Custom hook for managing invitation-related state and operations
 * @returns Invitation actions, loading states, and error handling
 */
export const useInvitationMutations = () => {
  const [inviteContact, { isLoading: inviting, error: inviteError, isSuccess: inviteSuccess }] =
    useInviteContactMutation()

  const [acceptInvitation, { isLoading: accepting, error: acceptError, isSuccess: acceptSuccess }] =
    useAcceptInvitationMutation()

  const [rejectInvitation, { isLoading: rejecting, error: rejectError, isSuccess: rejectSuccess }] =
    useRejectInvitationMutation()

  const errors = useMemo(() => {
    const rawErrors = {
      invite: inviteError,
      accept: acceptError,
      reject: rejectError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [inviteError, acceptError, rejectError])

  return {
    inviteContact,
    acceptInvitation,
    rejectInvitation,
    inviting,
    accepting,
    rejecting,
    inviteSuccess,
    acceptSuccess,
    rejectSuccess,
    errors,
  }
}
