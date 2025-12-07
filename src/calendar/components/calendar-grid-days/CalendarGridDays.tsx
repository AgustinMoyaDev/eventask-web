import { useEffect, useState } from 'react'

import clsx from 'clsx'
import dayjs from 'dayjs'

import { Button } from '@/components/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/Icons'
import { SlideTransition } from '@/components/slide-transition/SlideTransition'

import { CALENDAR_DAY_TYPE, CalendarDay } from '@/types/ui/calendar-day'

import { isActiveDay, isToday } from '@/calendar/utils/validateManagmentDate'

import { useCalendar } from '@/calendar/hooks/useCalendar'
import { useCalendarActions } from '@/store/hooks/useCalendarActions'

import styles from './CalendarGridDays.module.css'

export const CalendarGridDays = () => {
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'center' | null>(null)
  const { calendarDays, todayDateLabel, resetActiveCalendarDay } = useCalendar()
  const {
    weekDays,
    activeCalendarDay,
    setActiveCalendarDay,
    setMonth,
    setYear,
    getPreviousMonth,
    getNextMonth,
  } = useCalendarActions()

  useEffect(() => {
    return () => resetActiveCalendarDay()
  }, [resetActiveCalendarDay])

  const handleDayClick = (day: CalendarDay) => {
    if (day.type !== CALENDAR_DAY_TYPE.CURRENT) return
    setActiveCalendarDay(day)
  }

  const handleClickGoToday = () => {
    setSlideDirection('center')
    const today = dayjs()
    setMonth(today.month())
    setYear(today.year())
  }

  const handleGetPreviousMonth = () => {
    setSlideDirection('left')
    getPreviousMonth()
  }

  const handleGetNextMonth = () => {
    setSlideDirection('right')
    getNextMonth()
  }

  return (
    <div className={styles.calendar}>
      <section className={styles.calendarHeader}>
        <Button
          variant="fab"
          size="sm"
          className={styles.calendarNavBtn}
          onClick={handleGetPreviousMonth}
        >
          <ArrowLeftIcon />
        </Button>

        <Button variant="text" size="sm" onClick={handleClickGoToday}>
          {todayDateLabel}
        </Button>

        <Button
          variant="fab"
          size="sm"
          className={styles.calendarNavBtn}
          onClick={handleGetNextMonth}
        >
          <ArrowRightIcon />
        </Button>
      </section>

      <section className={styles.calendarWeekdays}>
        {weekDays.map(dayName => (
          <span key={dayName} className={styles.calendarWeekday}>
            {dayName}
          </span>
        ))}
      </section>

      <SlideTransition direction={slideDirection} onAnimationEnd={() => setSlideDirection(null)}>
        <section className={styles.calendarDays}>
          {calendarDays.map(calendarDay => {
            const { day, month, year, type, events } = calendarDay
            const dayHasEvents = events.length > 0

            return (
              <div
                key={`${type}-${year}-${month}-${day}`}
                onClick={() => handleDayClick(calendarDay)}
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
          })}
        </section>
      </SlideTransition>
    </div>
  )
}
