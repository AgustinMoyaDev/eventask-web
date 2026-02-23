import clsx from 'clsx'

import { Dayjs } from 'dayjs'

import styles from './DatePill.module.css'

interface Props {
  isToday: boolean
  date: Dayjs
  isSelected: boolean
  hasEvents: boolean
  onSelect: (date: Dayjs) => void
}

export const DatePill = ({ date, isToday, isSelected, hasEvents, onSelect }: Props) => {
  const numberDay = date.date()
  const nameDay = date.format('dddd').slice(0, 3)

  return (
    <>
      <button
        type="button"
        className={clsx(
          styles.pill,
          isToday && styles.today,
          isSelected && styles.selected,
          hasEvents && styles.pillHasEvents
        )}
        onClick={() => onSelect(date)}
      >
        <h3 className="text-title-md">{numberDay}</h3>
        <small>{nameDay}</small>
        <div className={styles.dot}></div>
      </button>
    </>
  )
}
