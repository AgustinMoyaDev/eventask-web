import { baseApi } from './baseApi'

import { IInvitation } from '../types/IInvitation'

export const invitationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Send invitation to user by email to become a contact
     * @param email - Target email address for invitation
     */
    inviteContact: builder.mutation<IInvitation, { email: string }>({
      query: ({ email }) => ({
        url: '/invitations/invite',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['User'], // Refresh contacts after sending
    }),
    /**
     * Accept a pending invitation and create bidirectional contact relationship
     * @param invitationId - ID of invitation to accept
     */
    acceptInvitation: builder.mutation<IInvitation, { invitationId: string }>({
      query: ({ invitationId }) => ({
        url: `/invitations/${invitationId}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: ['Invitation', 'User', 'Notification'],
    }),
    /**
     * Reject a pending invitation
     * @param invitationId - ID of invitation to reject
     */
    rejectInvitation: builder.mutation<IInvitation, { invitationId: string }>({
      query: ({ invitationId }) => ({
        url: `/invitations/${invitationId}/reject`,
        method: 'PUT',
      }),
      invalidatesTags: ['Invitation', 'Notification'],
    }),
  }),
})

export const {
  useInviteContactMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} = invitationApi
