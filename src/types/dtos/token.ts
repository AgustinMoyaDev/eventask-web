import { TokenType } from '../IToken'

export interface IResetPasswordDto {
  token: string
  newPassword: string
  type: TokenType
}
