import { baseApi } from '@/services/baseApi'

import { Invitation } from '@/types/entities/invitation'

export const invitationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Send invitation to user by email to become a contact
     * @param email - Target email address for invitation
     */
    inviteContact: builder.mutation<Invitation, { email: string }>({
      query: ({ email }) => ({
        url: '/invitations/invite',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: (result, _error, _arg) => (result ? ['User'] : []),
    }),
    /**
     * Accept a pending invitation and create bidirectional contact relationship
     * @param invitationId - ID of invitation to accept
     */
    acceptInvitation: builder.mutation<Invitation, { invitationId: string }>({
      query: ({ invitationId }) => ({
        url: `/invitations/${invitationId}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: (result, _error, _arg) =>
        result ? ['Invitation', 'User', 'Notification'] : [],
    }),
    /**
     * Reject a pending invitation
     * @param invitationId - ID of invitation to reject
     */
    rejectInvitation: builder.mutation<Invitation, { invitationId: string }>({
      query: ({ invitationId }) => ({
        url: `/invitations/${invitationId}/reject`,
        method: 'PUT',
      }),
      invalidatesTags: (result, _error, _arg) => (result ? ['Invitation', 'Notification'] : []),
    }),
  }),
})

export const {
  useInviteContactMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} = invitationApi
