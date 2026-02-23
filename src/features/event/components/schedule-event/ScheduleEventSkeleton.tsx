import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './ScheduleEvent.module.css'

export const ScheduleEventSkeleton = () => {
  return (
    <div className={styles.event} style={{ backgroundColor: 'inherit' }}>
      <Skeleton className={styles.eventBody} height="10rem" />
    </div>
  )
}
