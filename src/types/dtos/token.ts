import { TokenType } from '../entities/token'

export interface IResetPasswordDto {
  token: string
  newPassword: string
  type: TokenType
}
