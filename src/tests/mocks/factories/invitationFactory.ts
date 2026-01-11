import { faker } from '@faker-js/faker'

import { IInvitation, INVITATION_STATUS } from '@/types/IInvitation'

import { MOCK_LOGGED_USER_ID } from '../data/mockData'

/**
 * Creates a fake invitation
 * @param overwrites - Partial invitation properties to override defaults
 */
export function createFakeInvitation(overwrites: Partial<IInvitation> = {}): IInvitation {
  return {
    id: faker.string.uuid(),
    from: overwrites.from ?? MOCK_LOGGED_USER_ID,
    to: overwrites.to,
    email: overwrites.email ?? faker.internet.email(),
    status:
      overwrites.status ??
      faker.helpers.arrayElement([
        INVITATION_STATUS.PENDING,
        INVITATION_STATUS.ACCEPTED,
        INVITATION_STATUS.REJECTED,
      ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overwrites,
  }
}

/**
 * Creates multiple fake invitations
 * @param count - Number of invitations to create
 */
export function createFakeInvitations(count: number): IInvitation[] {
  return Array.from({ length: count }, () => createFakeInvitation())
}
