import { IBase } from './IBase'

export interface IUser extends IBase {
  firstName: string
  lastName: string
  email: string
  hasManualPassword: boolean
  profileImageURL: string
  googleId?: string
  contacts: IUser[]
}

export type UserId = Pick<IUser, 'id'>

export interface IUserForm {
  email: string
  firstName: string
  lastName: string
  profileImageURL: string
  newPassword?: string
  confirmPassword?: string
  contacts: IUser[]
}
