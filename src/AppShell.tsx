import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { AUTH_STATUS } from '@/auth/constants/auth-status'
import { useAuthMutations } from '@/auth/store/hooks/useAuthMutations'
import { useAuthState } from '@/auth/store/hooks/useAuthState'

import { AppShellSkeleton } from '@/layouts/AppShellSkeleton'
import { router } from '@/router/router'

export const AppShell = () => {
  const { status } = useAuthState()
  const { refresh } = useAuthMutations()

  useEffect(() => {
    refresh()
  }, [refresh])

  if (status === AUTH_STATUS.CHECKING) {
    return <AppShellSkeleton />
  }

  return <RouterProvider router={router} />
}
