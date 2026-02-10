import dayjs from 'dayjs'

import { CalendarDay } from '@/types/ui/calendar-day'
import { Event } from '@/types/entities/event'

export const isSameDay = (event: Event, cd: CalendarDay): boolean => {
  const eventStartDayjs = dayjs(event.start)
  const { day, month, year } = cd
  const calendarDayjs = dayjs().year(year).month(month).date(day)
  return eventStartDayjs.isSame(calendarDayjs)
}

export const isToday = (cd: CalendarDay) => {
  const today = dayjs()
  const { year, month, day } = cd
  return today.isSame(dayjs().year(year).month(month).date(day), 'day')
}

export const isActiveDay = (activeDay: CalendarDay, cd: CalendarDay) => {
  if (!activeDay) return
  const { day, month, year } = cd
  return activeDay.day === day && activeDay.month === month && activeDay.year === year
}
