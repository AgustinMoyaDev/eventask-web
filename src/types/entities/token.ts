import { Base } from './base'

export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET: 'reset',
} as const

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE]

export interface Token extends Base {
  token: string
  userId: string
  expiresAt: string // ISO 8601 String
  type: TokenType
}
