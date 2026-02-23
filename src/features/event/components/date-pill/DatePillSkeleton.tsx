import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './DatePill.module.css'

export const DatePillSkeleton = () => {
  return (
    <Skeleton
      className={styles.pill}
      stylesInline={{ backgroundColor: 'var(--color-outline-variant)' }}
    ></Skeleton>
  )
}
