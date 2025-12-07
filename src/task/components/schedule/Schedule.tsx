import { useRef } from 'react'
import clsx from 'clsx'

import { DROPPABLE_ITEM_TARGET } from '@/types/ui/dragNdrop'
import { ScheduleProps } from '@/types/ui/schedule'

import { DropZone } from '@/components/drag-n-drop/drop-zone/DropZone'

import { getHoursSchedule } from '@/utils/computedEvents'

import { ScheduleEvent } from '../schedule-event/ScheduleEvent'

import { useRowHeight } from './hooks/useRowHeight'

import styles from './Schedule.module.css'

export const Schedule = ({ segmentsForDay, onRequestNextDay }: ScheduleProps) => {
  const timescaleRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLElement>(null)
  const { rowHeight, labelHeight } = useRowHeight(timescaleRef, labelRef)
  const visualRowHeight = rowHeight
  const hoursSchedule = getHoursSchedule(segmentsForDay)
  const initialLocation = hoursSchedule[0] ?? 0

  const transitionKey =
    segmentsForDay
      .map(seg => `${seg.id}-${seg.isStartSegment ? 'S' : ''}${seg.isEndSegment ? 'E' : ''}`)
      .join('|') || 'no-events'

  return (
    <section className={clsx(styles.schedule, 'section')}>
      <DropZone itemId="remove-collaborator" itemType={DROPPABLE_ITEM_TARGET.TRASH} label="Remove">
        <aside className={styles.scheduleTimescale} ref={timescaleRef} aria-hidden="true">
          {hoursSchedule.map(h => (
            <small
              ref={labelRef}
              key={h}
              className={styles.scheduleTimescaleLabel}
            >{`${h}:00`}</small>
          ))}
        </aside>
      </DropZone>
      <div
        key={transitionKey}
        className={clsx(styles.scheduleEventList, styles.scheduleEventListAnimate)}
        role="list"
      >
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
