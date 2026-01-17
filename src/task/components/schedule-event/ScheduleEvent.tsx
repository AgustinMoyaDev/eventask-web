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
        styles.event,
        isStartSegment && styles.eventStart,
        isEndSegment && styles.eventEnd,
        status === EVENT_STATUS.COMPLETED && styles.eventCompleted
      )}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        animationDelay: `${index * 60}ms`,
      }}
      role="listitem"
    >
      <DropZone itemId={id} itemType={DROPPABLE_ITEM_TARGET.EVENT} label="Add collaborator">
        <header className={styles.header}>
          <h3 className={clsx('text-title-lg', styles.title)}>
            <span className={styles.titleText}>{title}</span>
            {status === EVENT_STATUS.COMPLETED && (
              <small className={styles.textCompleted}>(Done)</small>
            )}
          </h3>
          <Button
            variant="icon"
            size="sm"
            className={clsx(
              styles.statusBtn,
              status === EVENT_STATUS.COMPLETED && styles.statusBtnCompleted
            )}
            onClick={handleToggle}
            disabled={updatingStatus}
          >
            {updatingStatus ? <Loader /> : <CheckIcon className={styles.statusIcon} />}
          </Button>
        </header>

        <section className={styles.eventBody}>
          <p className={styles.eventNotes}>{notes}</p>

          {collaborators.length > 0 ? (
            <div className={styles.collaboratorsWrapper}>
              <div className={styles.collaborators}>
                <span className={styles.collaboratorsLabel}>
                  {collaborators.length === 1 ? 'Collaborator:' : 'Collaborators:'}
                </span>
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
              <Button
                variant="fab"
                className={styles.phoneBtn}
                title="This feature is under development"
              >
                <PhoneIcon />
              </Button>
            </div>
          ) : (
            <span className={styles.collaboratorsEmpty}>
              Drag task participants to become event collaborators.
            </span>
          )}
        </section>
        {isStartSegment && (
          <Button className={styles.followBtn} onClick={requestNextDay}>
            <span className={styles.followText}>Follow event</span>
            <ArrowRightIcon className={styles.followIcon} />
          </Button>
        )}
      </DropZone>
    </article>
  )
}
