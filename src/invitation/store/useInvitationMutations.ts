import { useMemo } from 'react'

import {
  useInviteContactMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from '@/services/invitationApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

/**
 * Custom hook for managing invitation-related state and operations
 * @returns Invitation actions, loading states, and error handling
 */
export const useInvitationMutations = () => {
  const [inviteContact, { isLoading: inviting, error: inviteRawError, isSuccess: inviteSuccess }] =
    useInviteContactMutation()

  const [
    acceptInvitation,
    { isLoading: accepting, error: acceptRawError, isSuccess: acceptSuccess },
  ] = useAcceptInvitationMutation()

  const [
    rejectInvitation,
    { isLoading: rejecting, error: rejectRawError, isSuccess: rejectSuccess },
  ] = useRejectInvitationMutation()

  const inviteContactError = useMemo(() => parseRTKError(inviteRawError), [inviteRawError])
  const acceptInvitationError = useMemo(() => parseRTKError(acceptRawError), [acceptRawError])
  const rejectInvitationError = useMemo(() => parseRTKError(rejectRawError), [rejectRawError])

  return {
    // Mutations
    inviteContact,
    acceptInvitation,
    rejectInvitation,
    // flags
    inviting,
    accepting,
    rejecting,
    inviteSuccess,
    acceptSuccess,
    rejectSuccess,
    // Errors
    inviteContactError,
    acceptInvitationError,
    rejectInvitationError,
  }
}
