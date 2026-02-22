import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'
import { ScheduleEventSkeleton } from '../schedule-event/ScheduleEventSkeleton'

import styles from './Schedule.module.css'

export const ScheduleSkeleton = () => {
  return (
    <section className={clsx(styles.schedule, 'section')} style={{ width: '100%' }}>
      <aside className={styles.scheduleTimescale} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, h) => (
          <Skeleton key={h} width="3rem" height="1rem" />
        ))}
      </aside>
      <div className={styles.scheduleEventList} style={{ width: '100%' }}>
        {Array.from({ length: 1 }).map((_, index) => (
          <ScheduleEventSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
