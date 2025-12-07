import clsx from 'clsx'

import { Loader } from '@/components/loaders/loader/Loader'
import { Button } from '@/components/button/Button'
import { ArrowRightIcon, CheckIcon, PhoneIcon } from '@/components/icons/Icons'
import { UsersAvatars } from '@/components/users-avatars/UsersAvatars'
import { DropZone } from '@/components/drag-n-drop/drop-zone/DropZone'

import { EVENT_STATUS } from '@/types/IEvent'
import { ScheduleEventProps } from '@/types/ui/schedule-event'
import { DROPPABLE_ITEM_TARGET, DRAGGABLE_ITEM_SRC, ORIGIN_NAME } from '@/types/ui/dragNdrop'

import { useEventActions } from '@/store/hooks/useEventActions'

import styles from './ScheduleEvent.module.css'

export const ScheduleEvent = ({
  initialLocation,
  rowHeight,
  labelHeight,
  segment,
  index,
  requestNextDay,
}: ScheduleEventProps) => {
  const {
    id,
    title,
    status,
    notes,
    start,
    isStartSegment,
    isEndSegment,
    duration,
    collaborators = [],
  } = segment
  const offsetHours = start.hour() + start.minute() / 60 - initialLocation
  const top = offsetHours * rowHeight + labelHeight / 2
  const height = duration * rowHeight
  const { updateEventStatus, updatingStatus } = useEventActions()

  const handleToggle = () => {
    const next = status === EVENT_STATUS.PENDING ? EVENT_STATUS.COMPLETED : EVENT_STATUS.PENDING
    updateEventStatus({ id, status: next })
  }

  return (
    <article
      className={clsx(
        styles.scheduleEvent,
        isStartSegment && styles.scheduleEventStart,
        isEndSegment && styles.scheduleEventEnd,
        status === EVENT_STATUS.COMPLETED && styles.scheduleEventCompleted
      )}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        animationDelay: `${index * 60}ms`,
      }}
      role="listitem"
    >
      <DropZone itemId={id} itemType={DROPPABLE_ITEM_TARGET.EVENT} label="Add collaborator">
        <header className={styles.scheduleEventHeader}>
          <h3 className={clsx('text-title-lg', styles.scheduleEventTitle)}>
            <span className={styles.scheduleEventTitleText}>{title}</span>
            {status === EVENT_STATUS.COMPLETED && (
              <small className={styles.scheduleEventTextCompleted}>(Done)</small>
            )}
          </h3>
          <Button
            variant="icon"
            size="sm"
            className={clsx(
              styles.scheduleEventStatusBtn,
              status === EVENT_STATUS.COMPLETED && styles.scheduleEventStatusBtnCompleted
            )}
            onClick={handleToggle}
            disabled={updatingStatus}
          >
            {updatingStatus ? <Loader /> : <CheckIcon className={styles.scheduleEventStatusIcon} />}
          </Button>
        </header>

        <section className={styles.scheduleEventBody}>
          <p className={styles.scheduleEventNotes}>{notes}</p>

          {collaborators.length > 0 ? (
            <div className={styles.scheduleEventCollaboratorsWrapper}>
              <div className={styles.scheduleEventCollaborators}>
                <span className={styles.scheduleEventCollaboratorsLabel}>Collaborators:</span>
                <UsersAvatars
                  users={collaborators}
                  draggable={{
                    id: '', // populate with collaborator ID
                    type: DRAGGABLE_ITEM_SRC.COLLABORATOR,
                    originId: segment.id,
                    originName: ORIGIN_NAME.EVENT,
                  }}
                />
              </div>
              <Button variant="fab" className={styles.scheduleEventPhoneBtn}>
                <PhoneIcon />
              </Button>
            </div>
          ) : (
            <span className={styles.scheduleEventCollaboratorsNoResults}>
              Drag task participants to become event collaborators.
            </span>
          )}
        </section>
        {isStartSegment && (
          <Button className={styles.scheduleEventFollowBtn} onClick={requestNextDay}>
            <span className={styles.scheduleEventNextText}>Follow event</span>
            <ArrowRightIcon className={styles.scheduleEventFollowIcon} />
          </Button>
        )}
      </DropZone>
    </article>
  )
}
