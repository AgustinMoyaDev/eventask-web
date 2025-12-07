import { useMemo } from 'react'

import {
  useInviteContactMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from '@/services/invitationApi'

import { getErrorMessage, OperationError } from '@/api/helpers/getErrorMessage'

/**
 * Custom hook for managing invitation-related state and operations
 * @returns Invitation actions, loading states, and error handling
 */
export const useInvitationActions = () => {
  const [inviteContact, { isLoading: inviting, error: inviteError, isSuccess: inviteSuccess }] =
    useInviteContactMutation()

  const [acceptInvitation, { isLoading: accepting, error: acceptError, isSuccess: acceptSuccess }] =
    useAcceptInvitationMutation()

  const [rejectInvitation, { isLoading: rejecting, error: rejectError, isSuccess: rejectSuccess }] =
    useRejectInvitationMutation()

  const {
    invite: inviteContactError,
    accept: acceptInvitationError,
    reject: rejectInvitationError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.INVITE, error: inviteError },
        { operation: OperationError.ACCEPT, error: acceptError },
        { operation: OperationError.REJECT, error: rejectError },
      ]),
    [inviteError, acceptError, rejectError]
  )

  return {
    // RTKQ Loading states
    inviting,
    accepting,
    rejecting,
    // RTKQ Success states
    inviteSuccess,
    acceptSuccess,
    rejectSuccess,
    // RTKQ mutations
    inviteContact,
    acceptInvitation,
    rejectInvitation,
    // RTKQ parsed errors
    inviteContactError,
    acceptInvitationError,
    rejectInvitationError,
  }
}
