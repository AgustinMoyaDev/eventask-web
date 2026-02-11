import { Base } from './base'

export interface User extends Base {
  profileImageURL: string
  firstName: string
  lastName: string
  email: string
  // password: string --- IGNORE ---
  contactsIds: string[]
  isEmailVerified: boolean
  hasManualPassword: boolean
  googleId?: string
  // virtual fields
  contacts?: User[]
}

export type UserId = Pick<User, 'id'>
