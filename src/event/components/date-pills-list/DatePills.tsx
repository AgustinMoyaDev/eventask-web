import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import clsx from 'clsx'

import { EventSegment } from '@/event/types/event-segment.types'

import { Button } from '@/components/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/Icons'
import { SlideTransition } from '@/components/slide-transition/SlideTransition'

import { DatePill } from '../date-pill/DatePill'

import styles from './DatePills.module.css'

interface Props {
  eventSegments: EventSegment[]
  selectedDate: Dayjs
  onSelectDate: (date: Dayjs) => void
}

export const DatePills = ({ eventSegments, selectedDate, onSelectDate }: Props) => {
  const [weekStart, setWeekStart] = useState<Dayjs>(() => selectedDate.startOf('week'))
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'center' | null>(null)

  const daysWithEvents = useMemo(() => {
    const set = new Set<string>()
    eventSegments.forEach(seg => {
      set.add(seg.start.startOf('day').toISOString())
      set.add(seg.end.startOf('day').toISOString())
    })
    return set
  }, [eventSegments])

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day')),
    [weekStart]
  )

  const handlePrevWeek = () => {
    setSlideDirection('right')
    const newStart = weekStart.subtract(1, 'week')
    setWeekStart(newStart)
    onSelectDate(newStart)
  }

  const handleNextWeek = () => {
    setSlideDirection('left')
    const newStart = weekStart.add(1, 'week')
    setWeekStart(newStart)
    onSelectDate(newStart)
  }

  const handleResetCurrentWeek = () => {
    setSlideDirection('center')
    setWeekStart(dayjs().startOf('week'))
    onSelectDate(dayjs())
  }

  return (
    <section className={clsx(styles.datePillsNav, 'section')}>
      <div className={styles.datePillsActions}>
        <Button variant="icon" size="sm" onClick={handlePrevWeek} aria-label="Previous week">
          <ArrowLeftIcon className={styles.datePillsNavIcon} />
        </Button>
        <Button variant="text" size="md" onClick={handleResetCurrentWeek} aria-label="Current week">
          Current week
        </Button>
        <Button variant="icon" size="sm" onClick={handleNextWeek} aria-label="Next week">
          <ArrowRightIcon className={styles.datePillsNavIcon} />
        </Button>
      </div>

      <SlideTransition direction={slideDirection} onAnimationEnd={() => setSlideDirection(null)}>
        <div className={styles.datePills} onAnimationEnd={() => setSlideDirection(null)}>
          {weekDays.map(date => {
            const isToday = date.isSame(dayjs(), 'day')
            const isSelected = date.isSame(selectedDate, 'day')
            const isoKey = date.startOf('day').toISOString()
            const hasEvents = daysWithEvents.has(isoKey)

            return (
              <DatePill
                key={date.toString()}
                date={date}
                isToday={isToday}
                isSelected={isSelected}
                onSelect={onSelectDate}
                hasEvents={hasEvents}
              />
            )
          })}
        </div>
      </SlideTransition>
    </section>
  )
}
