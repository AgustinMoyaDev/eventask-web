import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { AuthContentSkeleton } from './AuthContentSkeleton'
import { AuthBlob } from '@/auth/components/auth-blob/AuthBlob'

import styles from './AuthLayout.module.css'

export const AuthLayout = () => {
  return (
    <section className={styles.auth}>
      <AuthBlob />
      <div className={styles.authContainer}>
        <Suspense fallback={<AuthContentSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  )
}
