import { Navigate } from 'react-router-dom'

import { AUTH_STATUS } from '@/features/auth/constants/auth-status'
import { useAuthState } from '@/features/auth/store/hooks/useAuthState'

import { LandingPage } from '@/pages/landing-page/LandingPage'

/**
 * Resolves the root path (/) dynamically based on auth status.
 * Authenticated users are redirected to /home, others see the landing page.
 */
export const RootIndex = () => {
  const { status } = useAuthState()

  if (status === AUTH_STATUS.AUTHENTICATED) {
    return <Navigate to="/home" replace />
  }

  return <LandingPage />
}
