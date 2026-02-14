import { useRef } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { EVENT_DRAG_CONSTANTS } from '@/event/constants/event-drag.constants'
import { ScheduleProps } from './schedule.types'

import { getHoursSchedule } from '@/event/helpers/computedEvents'
import { useRowHeight } from './hooks/useRowHeight'

import { DropZone } from '@/components/drag-n-drop/drop-zone/DropZone'
import { ScheduleEvent } from '../schedule-event/ScheduleEvent'

import styles from './Schedule.module.css'

export const Schedule = ({ isToday, segmentsForDay, onRequestNextDay }: ScheduleProps) => {
  const timescaleRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLElement>(null)
  const { rowHeight, labelHeight } = useRowHeight(timescaleRef, labelRef)
  const visualRowHeight = rowHeight
  const hoursSchedule = getHoursSchedule(segmentsForDay)
  const initialLocation = hoursSchedule[0] ?? 0

  // Calculate current timeline position
  const now = dayjs()
  const currentHour = now.hour() + now.minute() / 60
  const currentTimeTop = (currentHour - initialLocation) * visualRowHeight + labelHeight / 2

  const transitionKey =
    segmentsForDay
      .map(seg => `${seg.id}-${seg.isStartSegment ? 'S' : ''}${seg.isEndSegment ? 'E' : ''}`)
      .join('|') || 'no-events'

  return (
    <section className={clsx(styles.schedule, 'section')}>
      <DropZone
        itemId="remove-collaborator"
        itemType={EVENT_DRAG_CONSTANTS.DROP_TARGETS.TRASH}
        label="Remove"
      >
        <aside className={styles.scheduleTimescale} ref={timescaleRef} aria-hidden="true">
          {hoursSchedule.map(h => (
            <small ref={labelRef} key={h} className={styles.scheduleTimescaleLabel}>
              {dayjs().hour(h).format('h A')}
            </small>
          ))}
        </aside>
      </DropZone>
      <div
        key={transitionKey}
        className={clsx(styles.scheduleEventList, styles.scheduleEventListAnimate)}
        role="list"
      >
        {isToday && (
          <div className={styles.currentTimeLine} style={{ top: `${currentTimeTop}px` }}>
            <div className={styles.currentTimeMarker} />
          </div>
        )}

        {segmentsForDay.length === 0 && (
          <div className={styles.scheduleNoEvents}>No events scheduled</div>
        )}

        {segmentsForDay.map((segment, index) => {
          return (
            <ScheduleEvent
              key={`${segment.id}-${segment.isStartSegment}`}
              segment={segment}
              index={index}
              initialLocation={initialLocation}
              rowHeight={visualRowHeight}
              labelHeight={labelHeight}
              requestNextDay={onRequestNextDay}
            />
          )
        })}
      </div>
    </section>
  )
}
