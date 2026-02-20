import { useEffect, useState } from 'react'

import { WEEKDAYS } from '@/calendar/constants/calendar.constants'

import { Button } from '@/components/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/Icons'
import { SlideTransition } from '@/components/slide-transition/SlideTransition'
import { CalendarDay } from '../calendar-day/CalendarDay'

import { useCalendar } from '@/calendar/hooks/useCalendar'
import { useCalendarActions } from '@/calendar/store/hooks/useCalendarActions'

import styles from './CalendarGridDays.module.css'

export const CalendarGridDays = () => {
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'center' | null>(null)
  const { calendarDaysWithEvents, todayDateLabel } = useCalendar()
  const { getPreviousMonth, getNextMonth, resetActiveCalendarDay, resetActiveCalendar } =
    useCalendarActions()

  useEffect(() => {
    return () => resetActiveCalendarDay()
  }, [resetActiveCalendarDay])

  const handleClickGoToday = () => {
    setSlideDirection('center')
    resetActiveCalendar()
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

        <Button variant="text" size="md" onClick={handleClickGoToday}>
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
        {WEEKDAYS.map(dayName => (
          <span key={dayName} className={styles.calendarWeekday}>
            {dayName}
          </span>
        ))}
      </section>

      <SlideTransition direction={slideDirection} onAnimationEnd={() => setSlideDirection(null)}>
        <section className={styles.calendarDays}>
          {calendarDaysWithEvents.map(calendarDay => {
            const { day, month, year, type } = calendarDay
            return <CalendarDay key={`${type}-${year}-${month}-${day}`} calendarDay={calendarDay} />
          })}
        </section>
      </SlideTransition>
    </div>
  )
}
