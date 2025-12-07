import { EventCard } from '../event-card/EventCard'
import { Button } from '@/components/button/Button'
import { PlusIcon } from '@/components/icons/Icons'

import { EventCardListProps } from '@/types/ui/event-card-list'

import styles from './EventCardList.module.css'

export const EventCardList = ({
  events,
  onOpenNewEventModal,
  onOpenEditEventModal,
  onDelete,
  eventsValid,
}: EventCardListProps) => {
  return (
    <section className={styles.eventCardList} aria-label="Related events to this task">
      {!eventsValid && (
        <small className={styles.eventCardListError} role="alert">
          You must add at least one event.
        </small>
      )}
      <div className={styles.eventCardListHeader}>
        <p className={styles.eventCardListTitle}>Related events:</p>
        <Button variant="fab" size="sm" onClick={onOpenNewEventModal}>
          <PlusIcon />
        </Button>
      </div>
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
