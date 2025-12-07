export interface ILoginDto {
  email: string
  password: string
}

export interface IRegisterDto {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IAuthResponseDto {
  userId: string
  accessToken: string
}

export interface IRefreshTokenDTO {
  token: string
  userId: string
  expiresAt: Date
}
