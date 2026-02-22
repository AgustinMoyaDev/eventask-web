import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './EventTimelineItem.module.css'

export const EventTimelineItemSkeleton = () => {
  return (
    <div className={styles.eventTimeline}>
      <div className={styles.eventTimelineContent}>
        <Skeleton className={styles.eventTimelineTitle} width="18rem" height="4rem" />
      </div>
    </div>
  )
}
