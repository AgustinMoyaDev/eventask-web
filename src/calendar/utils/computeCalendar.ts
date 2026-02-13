import dayjs from 'dayjs'

import { CalendarDay } from '../types/calendar.types'

export const computeCalendar = (month: number, year: number): CalendarDay[] => {
  // First day and last day of the month
  const firstOfMonth = dayjs().year(year).month(month).startOf('month')

  // Start of the grid (full week)
  const startGrid = firstOfMonth.startOf('week')

  // Total number of days (inclusive)
  const totalDays = 42

  // Generate Dayjs array for each day in the grid
  const allDays = Array.from({ length: totalDays }, (_, i) => startGrid.add(i, 'day'))

  // Map to CalendarDay with type prev/current/next
  return allDays.map(d => ({
    day: d.date(), // 1–31
    dayName: d.format('dddd'), // Monday, Tuesday, etc.
    month: d.month(), // 0–11
    year: d.year(), // 4 digits
    type: d.isBefore(firstOfMonth, 'day')
      ? 'prev'
      : d.isAfter(firstOfMonth.endOf('month'), 'day')
        ? 'next'
        : 'current',
  }))
}
