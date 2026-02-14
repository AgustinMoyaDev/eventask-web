import { CalendarDay } from '@/calendar/types/calendar.types'

import { useAppDispatch, useAppSelector } from '../../store/reduxStore'

import {
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onResetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} from '../store/calendarDaySlice'

export const useCalendarActions = () => {
  const dispatch = useAppDispatch()
  const { month, year, calendarDays, activeCalendarDay } = useAppSelector(
    state => state.calendarDay
  )

  const setMonth = (m: number) => {
    dispatch(onSetMonth(m))
  }

  const setYear = (y: number) => {
    dispatch(onSetYear(y))
  }

  const getNextMonth = () => {
    dispatch(onGetNextMonth())
  }

  const getPreviousMonth = () => {
    dispatch(onGetPreviousMonth())
  }

  const setActiveCalendarDay = (day: CalendarDay) => {
    dispatch(onSetActiveCalendarDay(day))
  }

  const resetActiveCalendarDay = () => {
    dispatch(onResetActiveCalendarDay())
  }

  return {
    //* Properties:
    month,
    year,
    calendarDays,
    activeCalendarDay,
    //* Methods:
    setMonth,
    setYear,
    getNextMonth,
    getPreviousMonth,
    setActiveCalendarDay,
    resetActiveCalendarDay,
  }
}
