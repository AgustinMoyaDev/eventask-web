import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { CALENDAR_DAY_TYPE, CalendarDay } from '../types/calendar.types'
import { WEEKDAYS } from '../constants/calendar.constants'

import { computeCalendar } from '@/calendar/utils/computeCalendar'

const now = dayjs()
export interface CalendarDayState {
  month: number
  year: number
  calendarDays: CalendarDay[]
  activeCalendarDay: CalendarDay
}

const initialState: CalendarDayState = {
  month: now.month(),
  year: now.year(),
  calendarDays: computeCalendar(now.month(), now.year()),
  activeCalendarDay: {
    day: now.date(),
    dayName: WEEKDAYS[now.day()],
    month: now.month(),
    year: now.year(),
    type: CALENDAR_DAY_TYPE.CURRENT,
  },
}

export const calendarDaySlice = createSlice({
  name: 'calendarDay',
  initialState,
  reducers: {
    onSetMonth: (state, { payload }: PayloadAction<number>) => {
      state.month = payload
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onSetYear: (state, { payload }: PayloadAction<number>) => {
      state.year = payload
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onGetNextMonth: state => {
      if (state.month === 11) {
        state.month = 0
        state.year += 1
      } else {
        state.month += 1
      }
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onGetPreviousMonth: state => {
      if (state.month === 0) {
        state.month = 11
        state.year -= 1
      } else {
        state.month -= 1
      }
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onSetActiveCalendarDay: (state, { payload }: PayloadAction<CalendarDay>) => {
      state.activeCalendarDay = payload
    },
    onResetActiveCalendarDay: state => {
      state.activeCalendarDay = initialState.activeCalendarDay
    },
  },
})

export const {
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onResetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} = calendarDaySlice.actions
