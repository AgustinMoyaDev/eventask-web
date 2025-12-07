import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './TaskInfo.module.css'

export const TaskInfoSkeleton = () => {
  return (
    <section className={clsx(styles.taskInfo, 'section')}>
      <div className={styles.taskInfoHeader}>
        <div className={styles.taskInfoTitleBlock}>
          <Skeleton className={styles.taskInfoTitle} width="6rem" height="1.375rem" />
          <div className={styles.taskInfoMeta}>
            <Skeleton width="4rem" height="1rem" />
            <Skeleton width="4rem" height="1rem" />
          </div>
          <Skeleton width="7rem" height="1rem" />
          <Skeleton width="5rem" height="1rem" />
          <Skeleton width="20rem" height="1rem" />
        </div>
        <Skeleton width="6rem" height="1.25rem" />
      </div>

      <div className={styles.taskInfoParticipants}>
        <Skeleton width="5rem" height="1rem" />
        <Skeleton width="20rem" height="3.25rem" borderRadius="var(--radius-full)" />
      </div>

      <div className={styles.taskInfoActions}>
        <Skeleton className={styles.actionBtn} width="3rem" height="3rem" />
        <Skeleton className={styles.actionBtn} width="6rem" height="3rem" />
        <Skeleton className={styles.actionBtn} width="6rem" height="3rem" />
      </div>
    </section>
  )
}
