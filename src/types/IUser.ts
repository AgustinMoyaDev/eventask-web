import { IBase } from './IBase'

export interface IUser extends IBase {
  firstName: string
  lastName: string
  email: string
  profileImageURL: string
  contacts: IUser[]
}

export type UserId = Pick<IUser, 'id'>

export interface IUserForm {
  email: string
  firstName: string
  lastName: string
  profileImageURL: string
  contacts: IUser[]
}
