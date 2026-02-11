import { EventCard } from '../../../event/components/event-card/EventCard'

import { EventCardListProps } from '@/types/ui/event-card-list'

import styles from './EventCardList.module.css'

export const EventCardList = ({ events, onOpenEditEventModal, onDelete }: EventCardListProps) => {
  return (
    <section className={styles.eventCardList} aria-label="Related events to this task">
      <div className={styles.eventCardListScrollable}>
        {events.length === 0 ? (
          <p className={styles.eventCardListEmpty}>There are no events added yet.</p>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onOpenEditEventModal}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}
