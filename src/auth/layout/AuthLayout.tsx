import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from '@/router/lazyPages'

import { AuthContentSkeleton } from './AuthContentSkeleton'

import styles from './AuthLayout.module.css'

export const AuthLayout = () => {
  return (
    <section className={styles.auth}>
      <div className={styles.authContainer}>
        <Suspense fallback={<AuthContentSkeleton />}>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </Suspense>
      </div>
    </section>
  )
}
