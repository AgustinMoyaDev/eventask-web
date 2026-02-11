import { Base } from './base'

export const INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const

export type InvitationStatus = (typeof INVITATION_STATUS)[keyof typeof INVITATION_STATUS]

export interface Invitation extends Base {
  from: string
  to?: string
  email: string
  status: InvitationStatus
}
