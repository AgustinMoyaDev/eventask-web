import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './OngoingTask.module.css'

export const OngoingTaskSkeleton = () => (
  <div className={styles.ongoingTask} style={{ pointerEvents: 'none' }}>
    <header className={styles.ongoingTaskHeader}>
      <Skeleton width="40%" height="1rem" />
      <Skeleton width="3.5rem" height="3.5rem" borderRadius="50%" />
    </header>
    <div className={styles.ongoingTaskBody}>
      <Skeleton width="60%" height="3rem" borderRadius="1rem" />
    </div>

    <div className={styles.ongoingTaskFooter}>
      <Skeleton width="40%" height="1rem" />
      <Skeleton width="3rem" height="2rem" borderRadius="1rem" />
    </div>
  </div>
)
