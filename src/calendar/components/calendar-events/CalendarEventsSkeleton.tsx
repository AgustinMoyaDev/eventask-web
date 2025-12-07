import { Skeleton } from '@/components/skeletons/Skeleton'
import { EventTimelineItemSkeleton } from '../event-timeline-item/EventTimelineItemSkeleton'

import styles from './CalendarEvents.module.css'

export const CalendarEventsSkeleton = () => {
  return (
    <aside className={styles.calendarEvents}>
      <header className={styles.calendarEventsHeader}>
        <Skeleton className={styles.calendarEventsHeaderDay} width="5rem" height="1.5rem" />
        <Skeleton className={styles.calendarEventsHeaderDate} width="5rem" height="1rem" />
      </header>

      <ul className={styles.eventsTimeline}>
        {Array.from({ length: 3 }).map((_, index) => (
          <EventTimelineItemSkeleton key={index} />
        ))}
      </ul>
    </aside>
  )
}
