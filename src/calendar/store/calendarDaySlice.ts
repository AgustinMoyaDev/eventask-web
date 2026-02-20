import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { CALENDAR_DAY_TYPE, CalendarDay } from '../types/calendar.types'
import { WEEKDAYS } from '../constants/calendar.constants'

import { computeCalendar } from '@/calendar/utils/computeCalendar'

const NOW = dayjs()
export interface CalendarDayState {
  month: number
  year: number
  calendarDays: CalendarDay[]
  activeCalendarDay: CalendarDay
}

const initialState: CalendarDayState = {
  month: NOW.month(),
  year: NOW.year(),
  calendarDays: computeCalendar(NOW.month(), NOW.year()),
  activeCalendarDay: {
    day: NOW.date(),
    dayName: WEEKDAYS[NOW.day()],
    month: NOW.month(),
    year: NOW.year(),
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
      const now = dayjs()
      state.activeCalendarDay = {
        day: now.date(),
        dayName: WEEKDAYS[now.day()],
        month: now.month(),
        year: now.year(),
        type: CALENDAR_DAY_TYPE.CURRENT,
      }
    },
    onResetCalendar: state => {
      const now = dayjs()
      state.month = now.month()
      state.year = now.year()
      state.calendarDays = computeCalendar(now.month(), now.year())
      state.activeCalendarDay = {
        day: now.date(),
        dayName: WEEKDAYS[now.day()],
        month: now.month(),
        year: now.year(),
        type: CALENDAR_DAY_TYPE.CURRENT,
      }
    },
  },
})

export const {
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onResetActiveCalendarDay,
  onResetCalendar,
  onSetMonth,
  onSetYear,
} = calendarDaySlice.actions
