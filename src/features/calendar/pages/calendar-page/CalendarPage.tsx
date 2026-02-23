import { CalendarEvents } from '@/features/calendar/components/calendar-events/CalendarEvents'
import { CalendarGridDays } from '@/features/calendar/components/calendar-grid-days/CalendarGridDays'

import styles from './CalendarPage.module.css'

const CalendarPage = () => {
  return (
    <section className={`${styles.calendarPage} section`}>
      <CalendarGridDays />
      <CalendarEvents />
    </section>
  )
}

export default CalendarPage
