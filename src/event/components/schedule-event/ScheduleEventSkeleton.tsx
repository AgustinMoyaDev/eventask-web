import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './ScheduleEvent.module.css'

export const ScheduleEventSkeleton = () => {
  return (
    <div
      className={styles.scheduleEvent}
      style={{ backgroundColor: 'inherit', border: '1px solid var(--color-outline)' }}
    >
      <header className={styles.scheduleEventHeader}>
        <Skeleton className={styles.scheduleEventTitle} width="7rem" height="2rem" />
        <Skeleton
          className={styles.scheduleEventPhoneBtn}
          width="3rem"
          height="3rem"
          borderRadius="var(--radius-full)"
        />
      </header>

      <section className={styles.scheduleEventBody}>
        <Skeleton className={styles.scheduleEventNotes} />

        <div className={styles.scheduleEventCollaboratorsWrapper}>
          <Skeleton width="20rem" height="3.5rem" borderRadius="var(--radius-full)" />
          <Skeleton
            className={styles.scheduleEventPhoneBtn}
            width="3rem"
            height="3rem"
            borderRadius="var(--radius-full)"
          />
        </div>
      </section>
    </div>
  )
}
