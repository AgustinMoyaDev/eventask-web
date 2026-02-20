import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'
import { TaskEventsSectionSkeleton } from '@/task/components/task-events-section/TaskEventsSectionSkeleton'
import { TaskParticipantsSectionSkeleton } from '@/task/components/task-participants-section/TaskParticipantSectionSkeleton'

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

        <TaskEventsSectionSkeleton />
        <TaskParticipantsSectionSkeleton />
      </div>
    </section>
  )
}
