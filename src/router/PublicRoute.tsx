import { Navigate } from 'react-router-dom'

import { AUTH_STATUS } from '@/features/auth/constants/auth-status'

import { useAuthState } from '@/features/auth/store/hooks/useAuthState'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status, accessToken } = useAuthState()

  if (status === AUTH_STATUS.AUTHENTICATED && accessToken) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}
