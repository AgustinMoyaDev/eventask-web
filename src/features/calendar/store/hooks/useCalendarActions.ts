import { useCallback } from 'react'

import { CalendarDay } from '@/calendar/types/calendar.types'

import { useAppDispatch } from '@/store/reduxStore'

import {
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onResetActiveCalendarDay,
  onSetMonth,
  onSetYear,
  onResetCalendar,
} from '../calendarDaySlice'

export const useCalendarActions = () => {
  const dispatch = useAppDispatch()

  const setMonth = useCallback(
    (m: number) => {
      dispatch(onSetMonth(m))
    },
    [dispatch]
  )

  const setYear = useCallback(
    (y: number) => {
      dispatch(onSetYear(y))
    },
    [dispatch]
  )

  const getNextMonth = useCallback(() => {
    dispatch(onGetNextMonth())
  }, [dispatch])

  const getPreviousMonth = useCallback(() => {
    dispatch(onGetPreviousMonth())
  }, [dispatch])

  const setActiveCalendarDay = (day: CalendarDay) => {
    dispatch(onSetActiveCalendarDay(day))
  }

  const resetActiveCalendarDay = useCallback(() => {
    dispatch(onResetActiveCalendarDay())
  }, [dispatch])

  const resetActiveCalendar = useCallback(() => {
    dispatch(onResetCalendar())
  }, [dispatch])

  return {
    setMonth,
    setYear,
    getNextMonth,
    getPreviousMonth,
    setActiveCalendarDay,
    resetActiveCalendarDay,
    resetActiveCalendar,
  }
}
