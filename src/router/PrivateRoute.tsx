import { Navigate } from 'react-router-dom'

import { AUTH_STATUS } from '@/features/auth/constants/auth-status'

import { useAuthState } from '@/features/auth/store/hooks/useAuthState'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status, accessToken } = useAuthState()

  if (status === AUTH_STATUS.NOT_AUTHENTICATED || !accessToken) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}
