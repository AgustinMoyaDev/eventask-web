import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './TaskEventsSection.module.css'

export const TaskEventsSectionSkeleton = () => {
  return <Skeleton className={styles.section} height="10rem" />
}
