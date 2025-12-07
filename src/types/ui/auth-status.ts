export const AUTH_STATUS = {
  CHECKING: 'checking',
  AUTHENTICATED: 'authenticated',
  NOT_AUTHENTICATED: 'not-authenticated',
} as const

export type AuthStatusType = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS]
