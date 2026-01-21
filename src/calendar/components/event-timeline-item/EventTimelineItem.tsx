import clsx from 'clsx'
import dayjs from 'dayjs'

import { EVENT_STATUS, IEvent } from '@/types/IEvent'
import { Button } from '@/components/button/Button'
import { useEventActions } from '@/store/hooks/useEventActions'
import { CheckIcon, DeleteIcon, EditIcon } from '@/components/icons/Icons'

import styles from './EventTimelineItem.module.css'

interface Props {
  event: IEvent
  onEditEvent: (event: IEvent) => void
  onDeleteEvent: (id: string) => void
}

export const EventTimelineItem = ({ event, onEditEvent, onDeleteEvent }: Props) => {
  const { id, status, title, task } = event
  const { updating, deleting } = useEventActions()

  return (
    <li
      className={clsx(
        styles.eventTimeline,
        status === EVENT_STATUS.COMPLETED && styles.eventTimelineDisabled
      )}
    >
      <Button
        variant="icon"
        size="sm"
        className={styles.eventTimelineBtn}
        onClick={() => onEditEvent(event)}
        disabled={updating}
        aria-label={`Edit event: ${title}`}
      >
        <EditIcon />
      </Button>
      <span
        className={clsx(
          styles.eventTimelineMarker,
          status === EVENT_STATUS.COMPLETED && styles.eventTimelineMarkerCompleted
        )}
      >
        {status === EVENT_STATUS.COMPLETED && <CheckIcon size={22} />}
      </span>

      <div className={styles.eventTimelineContent}>
        <h2 className={`text-title-md line-clamp-1 ${styles.eventTimelineTitle}`}>{title}</h2>
        {task && (
          <h3 className={`text-title-sm line-clamp-1 ${styles.eventTimelineSubtitle}`}>
            Task: {task.title}
          </h3>
        )}

        <span className={styles.eventTimelineTime}>
          {`${dayjs(event.start).format('h:mm A')} - ${dayjs(event.end).format('h:mm A')}`}
        </span>
      </div>
      <Button
        variant="icon"
        className={clsx(styles.eventTimelineBtn, styles.eventTimelineBtnDelete)}
        size="sm"
        onClick={() => onDeleteEvent(id)}
        disabled={deleting}
        aria-label={`Delete event: ${title}`}
      >
        <DeleteIcon />
      </Button>
    </li>
  )
}
