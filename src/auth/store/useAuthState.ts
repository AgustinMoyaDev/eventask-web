import { AUTH_STATUS } from '@/auth/constants/auth-status'
import { useAppSelector } from '@/store/reduxStore'

/**
 * Auth State Selector Hook
 *
 * Provides read-only access to authentication state.
 * Use this hook when you only need to read auth state without performing mutations.
 *
 * @example
 * ```tsx
 * const { isAuthenticated, currentUserId } = useAuthState()
 * ```
 */
export const useAuthState = () => {
  const { status, currentUserId, accessToken } = useAppSelector(state => state.auth)

  return {
    status,
    currentUserId,
    accessToken,
    isAuthenticated: status === AUTH_STATUS.AUTHENTICATED,
    isChecking: status === AUTH_STATUS.CHECKING,
    isNotAuthenticated: status === AUTH_STATUS.NOT_AUTHENTICATED,
  }
}
