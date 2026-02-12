/**
 * Authentication Status Constants
 *
 * Represents the possible states of the authentication flow.
 * Used by the auth slice, guards, and routing logic.
 */
export const AUTH_STATUS = {
  CHECKING: 'checking',
  AUTHENTICATED: 'authenticated',
  NOT_AUTHENTICATED: 'not-authenticated',
} as const

export type AuthStatusType = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS]
