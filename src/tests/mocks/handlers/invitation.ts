import { http, HttpResponse, delay } from 'msw'

import { DELAYS } from '../utils/delays'
import { MOCK_CONTACTS, MOCK_NOTIFICATIONS } from '../data/mockData'

import { INVITATION_STATUS } from '@/types/entities/invitation'
import { NOTIFICATION_TYPE } from '@/types/entities/notification'

export const invitationHandlers = [
  /**
   * POST /api/invitations/invite - Send invitation to email
   * Creates new invitation with status 'pending'
   */
  http.post('*/api/invitations/invite', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const { email } = (await request.json()) as { email: string }

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return HttpResponse.json({ message: 'Invalid email format' }, { status: 400 })
    }

    // Check if already a contact
    const isContact = MOCK_CONTACTS.some(contact => contact.email === email)
    if (isContact) {
      return HttpResponse.json({ message: 'User is already your contact' }, { status: 409 })
    }

    return HttpResponse.json({ message: 'Invitation sent successfully' }, { status: 201 })
  }),
  /**
   * PUT /api/invitations/:id/accept - Accept pending invitation
   * Updates notification data.invitationStatus to 'accepted'
   */
  http.put('*/api/invitations/:invitationId/accept', async ({ params }) => {
    await delay(DELAYS.NORMAL)
    const { invitationId } = params

    const notification = MOCK_NOTIFICATIONS.find(n => n.data?.invitationId === invitationId)

    if (!notification || notification.type !== NOTIFICATION_TYPE.INVITATION) {
      return HttpResponse.json({ message: 'Invitation not found' }, { status: 404 })
    }

    if (notification.data?.invitationStatus !== INVITATION_STATUS.PENDING) {
      return HttpResponse.json({ message: 'Invitation already resolved' }, { status: 400 })
    }

    // Update invitation status in notification data
    notification.data.invitationStatus = INVITATION_STATUS.ACCEPTED
    notification.read = true
    notification.updatedAt = new Date().toISOString()
    notification.title = 'Invitation Accepted'
    notification.message = 'Your invitation has been accepted'

    return HttpResponse.json(notification)
  }),
  /**
   * PUT /api/invitations/:id/reject - Reject pending invitation
   * Updates status to 'rejected'
   */
  http.put('*/api/invitations/:invitationId/reject', async ({ params }) => {
    await delay(DELAYS.NORMAL)
    const { invitationId } = params

    const notification = MOCK_NOTIFICATIONS.find(n => n.data?.invitationId === invitationId)

    if (!notification || notification.type !== NOTIFICATION_TYPE.INVITATION) {
      return HttpResponse.json({ message: 'Invitation not found' }, { status: 404 })
    }

    if (notification.data?.invitationStatus !== INVITATION_STATUS.PENDING) {
      return HttpResponse.json({ message: 'Invitation already resolved' }, { status: 400 })
    }

    // Update invitation status in notification data
    notification.data.invitationStatus = INVITATION_STATUS.REJECTED
    notification.read = true
    notification.updatedAt = new Date().toISOString()
    notification.title = 'Invitation Declined'
    notification.message = 'Your invitation has been declined'

    return HttpResponse.json(notification)
  }),
]
