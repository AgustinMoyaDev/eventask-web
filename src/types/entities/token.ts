export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET: 'reset',
} as const

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE]

export interface Token {
  token: string
  userId: string
  expiresAt: Date
  type: TokenType
}
