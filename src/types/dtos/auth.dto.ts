import { TokenType } from '@/types/entities/token'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AuthResponseDto {
  userId: string
  accessToken: string
}

export interface SetPasswordDto {
  newPassword: string
}

export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
}

export interface ResetPasswordDto {
  token: string
  newPassword: string
  type: TokenType
}
