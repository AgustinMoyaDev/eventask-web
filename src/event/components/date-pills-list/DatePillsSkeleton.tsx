import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import { DatePillSkeleton } from '../date-pill/DatePillSkeleton'

import styles from './DatePills.module.css'

export const DatePillsSkeleton = () => {
  return (
    <section className={clsx(styles.datePillsNav, 'section')}>
      <div className={styles.datePillsActions}>
        <Skeleton width="3rem" height="3rem" borderRadius="3rem" />
        <Skeleton width="10rem" height="2rem" />
        <Skeleton width="3rem" height="3rem" borderRadius="3rem" />
      </div>

      <div className={styles.datePills}>
        {Array.from({ length: 7 }).map((_, index) => (
          <DatePillSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
