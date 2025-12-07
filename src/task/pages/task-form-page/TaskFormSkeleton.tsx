import { clsx } from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './TaskFormPage.module.css'

export const TaskFormSkeleton = () => {
  return (
    <section className={clsx(styles.taskFormPage, 'section')} style={{ minHeight: '680px' }}>
      <div
        className={styles.taskForm}
        style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
      >
        <header className={styles.taskFormHeader}>
          <Skeleton width={200} height="2rem" />
          <Skeleton width={80} height="2rem" />
        </header>

        <div
          className={styles.taskFormFieldset}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <Skeleton width="100%" height="4rem" />

          <Skeleton width="100%" height="4rem" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton width="7rem" height="2.5rem" />
            <Skeleton width="100%" height="10rem" />
          </div>

          <div style={{ marginTop: '1rem', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
            <Skeleton width="100%" height="10rem" />
          </div>

          <footer
            className={styles.taskFormFooter}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <Skeleton width="6.25rem" height="2.5rem" />
            <Skeleton width="6.25rem" height="2.5rem" />
          </footer>
        </div>
      </div>
    </section>
  )
}
