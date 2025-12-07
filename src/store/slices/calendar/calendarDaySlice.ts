import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import dayjs, { Dayjs } from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

import { CALENDAR_DAY_TYPE, WEEKDAYS, CalendarDay } from '@/types/ui/calendar-day'

import { computeCalendar } from '@/calendar/utils/computeCalendar'

dayjs.extend(localeData)
const now = dayjs()
export interface CalendarDayState {
  today: Dayjs
  weekDays: string[]
  month: number
  year: number
  calendarDays: CalendarDay[]
  activeCalendarDay: CalendarDay
}

const initialState: CalendarDayState = {
  today: now,
  weekDays: WEEKDAYS,
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
    onGenerateCalendar: state => {
      state.calendarDays = computeCalendar(state.month, state.year)
    },
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

// Action creators are generated for each case reducer function
export const {
  onGenerateCalendar,
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onResetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} = calendarDaySlice.actions
