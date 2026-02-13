import { useCallback, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { ConfirmModal } from '@/components/confirm-modal/ConfirmModal'
import { EventTimelineItem } from '@/calendar/components/event-timeline-item/EventTimelineItem'

import { ModalIds } from '@/types/ui/modal'
import { Event } from '@/types/entities/event'

import { useCalendar } from '@/calendar/hooks/useCalendar'
import { useModalActions } from '@/store/hooks/useModalActions'
import { useEventActions } from '@/store/hooks/useEventActions'
import { useCalendarActions } from '@/calendar/hooks/useCalendarActions'

import { CalendarEventsSkeleton } from './CalendarEventsSkeleton'

import styles from './CalendarEvents.module.css'

/**
 * Calendar Events Component
 *
 * Displays events for the selected calendar day with timeline view.
 * Provides functionality to edit and delete events.
 *
 * @returns JSX element containing the calendar events sidebar
 */
export const CalendarEvents = () => {
  const navigate = useNavigate()
  const { isOpen, open, close } = useModalActions(ModalIds.Confirm)
  const { activeCalendarDay } = useCalendarActions()
  const { activeEvent, setActiveEvent, clearActiveEvent, deleteEvent } = useEventActions()
  const { fetchingMonthlyEvents, eventsForActiveDay, activeCalendarDayName, fullDateLabel } =
    useCalendar()

  const handleClickDeleteEvent = useCallback(
    (id: string) => {
      setActiveEvent(id)
      open()
    },
    [setActiveEvent, open]
  )

  const handleClickEditEvent = useCallback(
    ({ taskId, id }: Event) => {
      if (!taskId) return
      navigate(`/task/${taskId}/edit?editEvent=${id}`, { replace: true })
    },
    [navigate]
  )

  const handleConfirmDelete = useCallback(async () => {
    if (!activeEvent) return
    await deleteEvent({ id: activeEvent.id, taskId: activeEvent.taskId! })
    clearActiveEvent()
    close()
  }, [activeEvent, deleteEvent, clearActiveEvent, close])

  const eventsListContent = useMemo(() => {
    if (eventsForActiveDay.length === 0) {
      return <span className={styles.eventsTimelineEmpty}>No events</span>
    }

    return eventsForActiveDay.map(event => (
      <EventTimelineItem
        key={event.id}
        event={event}
        onEditEvent={handleClickEditEvent}
        onDeleteEvent={handleClickDeleteEvent}
      />
    ))
  }, [eventsForActiveDay, handleClickEditEvent, handleClickDeleteEvent])

  return fetchingMonthlyEvents ? (
    <CalendarEventsSkeleton />
  ) : (
    <aside className={styles.calendarEvents}>
      {!activeCalendarDay && (
        <span className={styles.calendarEventsEmpty} role="status" aria-live="polite">
          No day selected
        </span>
      )}

      <header className={styles.calendarEventsHeader}>
        <span className={styles.calendarEventsHeaderDay}>{activeCalendarDayName}</span>
        <span className={styles.calendarEventsHeaderDate}>{fullDateLabel}</span>
      </header>

      <ul className={styles.eventsTimeline}>{eventsListContent}</ul>

      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="Delete Task"
          message="Are you sure you want to delete this event?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={close}
        />
      )}
    </aside>
  )
}
