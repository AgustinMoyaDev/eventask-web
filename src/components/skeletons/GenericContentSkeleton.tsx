import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './GenericContentSkeleton.module.css'

/**
 * Skeleton for the main content area (Title + Grid).
 * Used in RootLayout and CalendarLayout during route transitions.
 */
export const GenericContentSkeleton = () => {
  return (
    <div className={styles.genericSkeleton} style={{ marginTop: '1rem' }}>
      <Skeleton className={styles.genericSkeletonTitle} />
      <div className={styles.genericSkeletonFlex}>
        <Skeleton />
        <Skeleton />
      </div>

      <div className={styles.genericSkeletonGrid}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}
