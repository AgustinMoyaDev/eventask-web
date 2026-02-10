import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './TaskEditPage.module.css'

export const TaskEditSkeleton = () => {
  return (
    <section className={clsx(styles.taskEditPage, 'section')}>
      <div className={styles.taskEditContainer}>
        <header className={styles.taskEditHeader}>
          <Skeleton width="10rem" height="2rem" />
          <Skeleton width="20rem" height="1rem" />
        </header>

        <div className={styles.taskEditInfo}>
          <Skeleton width="100%" height="3rem" />
          <Skeleton width="10rem" height="1.5rem" />
        </div>

        <div className={styles.taskEditSection}>
          <Skeleton width="8rem" height="1.5rem" />
          <Skeleton width="100%" height="10rem" />
        </div>

        <div className={styles.taskEditSection}>
          <Skeleton width="8rem" height="1.5rem" />
          <Skeleton width="100%" height="10rem" />
        </div>
      </div>
    </section>
  )
}
