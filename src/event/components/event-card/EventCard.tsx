import dayjs from 'dayjs'
import clsx from 'clsx'

import { EventCardProps } from '@/types/ui/event-card'
import { EVENT_STATUS } from '@/types/entities/event'

import { Button } from '@/components/button/Button'
import { DeleteIcon, EditIcon, SeparatorIcon } from '@/components/icons/Icons'

import styles from './EventCard.module.css'

export const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  const { id, status, title, start, end, notes } = event

  const formattedStart = dayjs(start).format('MMM DD, h:mm A')
  const formattedEnd = dayjs(end).format('MMM DD, h:mm A')
  const formattedNotes = notes.length > 30 ? `${notes.slice(0, 30)}...` : notes

  return (
    <article
      className={clsx(
        styles.eventCard,
        status === EVENT_STATUS.COMPLETED && styles.eventCardCompleted
      )}
      aria-label={`Event: ${title}`}
    >
      <section className={styles.eventCardActions}>
        <Button
          aria-label="Edit event"
          variant="icon"
          size="sm"
          className={clsx(styles.eventCardBtn, styles.eventCardBtnEdit)}
          onClick={() => onEdit({ ...event })}
        >
          <EditIcon />
        </Button>
        <Button
          aria-label="Delete event"
          variant="icon"
          size="sm"
          className={clsx(styles.eventCardBtn, styles.eventCardBtnDelete)}
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </Button>
      </section>
      <header className={styles.eventCardHeader}>
        <span
          className={clsx(
            'text-title-sm',
            styles.eventCardTitle,
            status === EVENT_STATUS.COMPLETED && styles.eventCardTitleCompleted
          )}
        >
          {title}
        </span>
        {status === EVENT_STATUS.COMPLETED && <small>&nbsp;(done)</small>}
      </header>
      <div className={styles.eventCardContent}>
        <time className={styles.eventCardTime}>
          <span>{formattedStart}</span>
          <SeparatorIcon size={15} />
          <span>{formattedEnd}</span>
        </time>
        {notes && <p className={styles.eventCardNotes}>{formattedNotes}</p>}
      </div>
    </article>
  )
}
