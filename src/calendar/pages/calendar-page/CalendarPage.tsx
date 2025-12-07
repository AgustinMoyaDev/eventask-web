import { CalendarEvents } from '@/calendar/components/calendar-events/CalendarEvents'
import { CalendarGridDays } from '@/calendar/components/calendar-grid-days/CalendarGridDays'

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
