import { invitationApi } from '@/services/invitationApi'
import { registerToastFor } from '@/components/toast/store/toastHelper'

export function registerInvitationToastListeners() {
  const { inviteContact, acceptInvitation, rejectInvitation } = invitationApi.endpoints

  const sendInvitationOperation = {
    endpoints: {
      matchPending: inviteContact.matchPending,
      matchFulfilled: inviteContact.matchFulfilled,
      matchRejected: inviteContact.matchRejected,
    },
    messages: {
      loading: 'Sending invitation…',
      success: 'Invitation sent successfully',
      error: 'Error sending invitation',
    },
  }

  const acceptInvitationOperation = {
    endpoints: {
      matchPending: acceptInvitation.matchPending,
      matchFulfilled: acceptInvitation.matchFulfilled,
      matchRejected: acceptInvitation.matchRejected,
    },
    messages: {
      loading: 'Accepting invitation…',
      success: 'Invitation accepted successfully',
      error: 'Error accepting invitation',
    },
  }

  const rejectInvitationOperation = {
    endpoints: {
      matchPending: rejectInvitation.matchPending,
      matchFulfilled: rejectInvitation.matchFulfilled,
      matchRejected: rejectInvitation.matchRejected,
    },
    messages: {
      loading: 'Rejecting invitation…',
      success: 'Invitation rejected successfully',
      error: 'Error rejecting invitation',
    },
  }

  const toastInvitationOperations = [
    sendInvitationOperation,
    acceptInvitationOperation,
    rejectInvitationOperation,
  ]

  toastInvitationOperations.forEach(({ endpoints, messages }) =>
    registerToastFor({ endpoints, messages })
  )
}
