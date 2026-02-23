import { useAppSelector } from '@/store/reduxStore'

export const useCalendarState = () => {
  const { activeCalendarDay, calendarDays, month, year } = useAppSelector(
    state => state.calendarDay
  )

  return { activeCalendarDay, calendarDays, month, year }
}
