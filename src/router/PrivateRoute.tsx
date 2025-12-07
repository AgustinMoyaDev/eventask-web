import { Navigate } from 'react-router-dom'

import { AUTH_STATUS } from '@/types/ui/auth-status'

import { useAppSelector } from '../store/reduxStore'

import { AppShellSkeleton } from '../layouts/AppShellSkeleton'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  if (status === AUTH_STATUS.CHECKING) return <AppShellSkeleton />

  if (status === AUTH_STATUS.NOT_AUTHENTICATED || !accessToken) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}
