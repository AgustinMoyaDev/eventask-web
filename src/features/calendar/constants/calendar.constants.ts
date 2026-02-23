import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

/**
 * Calendar Constants
 *
 * Global constants for calendar display.
 */

/** Short weekday names (Sun, Mon, Tue, ...) */
export const WEEKDAYS = dayjs.weekdaysShort()

/** Full month names (January, February, ...) */
export const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, i))
)
