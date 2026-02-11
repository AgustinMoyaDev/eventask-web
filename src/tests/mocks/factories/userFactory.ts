/**
 * User Factory
 * Generates fake User objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'
import type { User } from '@/types/entities/user'

/**
 * Creates a fake User object with realistic data.
 *
 * @param overwrites - Partial User to override default generated values
 * @returns A complete User object with fake data
 *
 * @example
 * ```typescript
 * // Generate random user
 * const user = createFakeUser()
 *
 * // Generate user with specific email
 * const specificUser = createFakeUser({ email: 'test@example.com' })
 *
 * // Generate user with contacts
 * const userWithContacts = createFakeUser({
 *   contacts: [createFakeUser(), createFakeUser()]
 * })
 * ```
 */
export function createFakeUser(overwrites: Partial<User> = {}): User {
  const {
    id = faker.string.uuid(),
    firstName = faker.person.firstName(),
    lastName = faker.person.lastName(),
    email = faker.internet.email({ firstName, lastName }),
    hasManualPassword = faker.datatype.boolean(),
    profileImageURL = faker.image.avatar(),
    googleId = faker.datatype.boolean() ? faker.string.uuid() : undefined,
    contacts = [],
    createdAt = faker.date.past(),
    updatedAt = faker.date.recent(),
  } = overwrites

  return {
    id,
    firstName,
    lastName,
    email,
    hasManualPassword,
    profileImageURL,
    googleId,
    contacts,
    createdAt,
    updatedAt,
  }
}

/**
 * Creates multiple fake User objects.
 *
 * @param count - Number of users to generate
 * @param overwrites - Partial User applied to all generated users
 * @returns Array of User objects
 *
 * @example
 * ```typescript
 * // Generate 10 random users
 * const users = createFakeUsers(10)
 *
 * // Generate 5 users with manual passwords
 * const manualUsers = createFakeUsers(5, { hasManualPassword: true })
 * ```
 */
export function createFakeUsers(count: number, overwrites: Partial<User> = {}): User[] {
  return Array.from({ length: count }, () => createFakeUser(overwrites))
}
