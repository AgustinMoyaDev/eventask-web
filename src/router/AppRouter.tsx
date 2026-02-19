import { useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import clsx from 'clsx'

import { AUTH_STATUS } from '@/auth/constants/auth-status'

import { AuthLayout } from '@/auth/layout/AuthLayout'
import { CalendarLayout } from '@/calendar/layouts/CalendarLayout'
import { RootLayout } from '@/layouts/RootLayout'

import { useAuthState } from '@/auth/store/hooks/useAuthState'
import { useAuthMutations } from '@/auth/store/hooks/useAuthMutations'

import { useTransitionPage } from '@/hooks/useTransitionPage'

import { Header } from '@/components/header/Header'
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { Footer } from '@/components/footer/Footer'
import { AuthBlob } from '@/auth/components/auth-blob/AuthBlob'
import { AppShellSkeleton } from '@/layouts/AppShellSkeleton'

import { NotFoundPage } from '@/pages/404-page/NotFoundPage'
import { LandingPage } from '@/pages/landing-page/LandingPage'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import styles from './AppRouter.module.css'

export const AppRouter = () => {
  const { status } = useAuthState()
  const { refresh } = useAuthMutations()
  const { location, displayLocation, transitionPage, handleTransitionEnd } = useTransitionPage()

  useEffect(() => {
    refresh()
  }, [refresh])

  // ==================== VALIDATIONS ====================
  const isAuthChecking = status === AUTH_STATUS.CHECKING
  const isAuthenticated = status === AUTH_STATUS.AUTHENTICATED
  const isNotAuthenticated = status === AUTH_STATUS.NOT_AUTHENTICATED

  const is404Page = location.pathname === '/not-found'
  const isLandingPage = location.pathname === '/' && isNotAuthenticated
  const isAuthRoute =
    location.pathname.startsWith('/auth') || displayLocation.pathname.startsWith('/auth')
  const showHeader = (isAuthenticated || isLandingPage) && !is404Page
  const showBreadcrumb = isAuthenticated && !is404Page
  const showAuthBlob = isNotAuthenticated && isAuthRoute

  const authenticatedBaseUrlElement =
    status === AUTH_STATUS.AUTHENTICATED ? <Navigate to="/home" replace /> : <LandingPage />

  // ==================== RENDER ====================
  if (isAuthChecking) return <AppShellSkeleton />

  return (
    <div className={styles.appContainer}>
      {showAuthBlob && <AuthBlob />}
      {showHeader && <Header />}
      {showBreadcrumb && <Breadcrumb />}
      <main
        className={clsx('main', styles.mainContent, transitionPage)}
        onAnimationEnd={handleTransitionEnd}
      >
        <Routes location={displayLocation} key={displayLocation.pathname + displayLocation.search}>
          <Route path="/" element={authenticatedBaseUrlElement} />
          <Route
            path="/auth/*"
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          />

          <Route path="/not-found" element={<NotFoundPage />} />

          <Route
            path="/calendar/*"
            element={
              <PrivateRoute>
                <CalendarLayout />
              </PrivateRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <RootLayout />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
