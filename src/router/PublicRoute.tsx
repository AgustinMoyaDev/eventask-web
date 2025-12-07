import { Navigate } from 'react-router-dom'

import { AUTH_STATUS } from '@/types/ui/auth-status'

import { useAppSelector } from '../store/reduxStore'
import { AppShellSkeleton } from '../layouts/AppShellSkeleton'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  if (status === AUTH_STATUS.CHECKING) return <AppShellSkeleton />

  if (status === AUTH_STATUS.AUTHENTICATED && accessToken) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}
