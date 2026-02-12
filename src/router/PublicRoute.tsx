import { Navigate } from 'react-router-dom'

import { AUTH_STATUS } from '@/auth/constants/auth-status'

import { useAppSelector } from '../store/reduxStore'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  if (status === AUTH_STATUS.AUTHENTICATED && accessToken) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}
