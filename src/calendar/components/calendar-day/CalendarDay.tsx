import clsx from 'clsx'

import { CALENDAR_DAY_TYPE, CalendarDayWithEvents } from '@/calendar/types/calendar.types'

import { isActiveDay, isToday } from '@/calendar/utils/validateManagmentDate'

import { useCalendarState } from '@/calendar/store/hooks/useCalendarState'
import { useCalendarActions } from '@/calendar/store/hooks/useCalendarActions'

import styles from './CalendarDay.module.css'

export interface CalendarDayProps {
  calendarDay: CalendarDayWithEvents
}

export const CalendarDay = ({ calendarDay }: CalendarDayProps) => {
  const { day, type, events } = calendarDay
  const dayHasEvents = events.length > 0

  const { activeCalendarDay } = useCalendarState()
  const { setActiveCalendarDay } = useCalendarActions()

  const handleDayClick = () => {
    if (type !== CALENDAR_DAY_TYPE.CURRENT) return
    setActiveCalendarDay(calendarDay)
  }

  return (
    <div
      onClick={handleDayClick}
      className={clsx(
        styles.calendarDay,
        type === CALENDAR_DAY_TYPE.PREVIOUS && styles.calendarDayPrev,
        type === CALENDAR_DAY_TYPE.NEXT && styles.calendarDayNext,
        isActiveDay(activeCalendarDay!, calendarDay) && styles.calendarDayActive,
        isToday(calendarDay) && styles.calendarDayToday,
        dayHasEvents && styles.calendarDayEvent
      )}
    >
      {day}
    </div>
  )
}
