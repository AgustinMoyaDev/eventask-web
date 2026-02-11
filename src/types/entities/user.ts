import { Base } from './base'

export interface User extends Base {
  firstName: string
  lastName: string
  email: string
  hasManualPassword: boolean
  profileImageURL: string
  googleId?: string
  contacts: User[]
}

export type UserId = Pick<User, 'id'>
