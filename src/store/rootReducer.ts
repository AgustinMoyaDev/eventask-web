import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '../services/baseApi'

import { authSlice } from '@/features/auth/store/authSlice'
import { taskSlice } from '@/features/task/store/slice/taskSlice'
import { calendarDaySlice } from '@/features/calendar/store/calendarDaySlice'
import { eventSlice } from '@/features/event/store/slice/eventSlice'

import { modalSlice } from '@/components/modal/store/modalSlice'
import { toastSlice } from '@/components/toast/store/toastSlice'
import { securitySlice } from './slices/security/securitySlice'

export const rootReducer = combineReducers({
  // Reducer de RTK Query para baseApi
  [baseApi.reducerPath]: baseApi.reducer,
  // Reducers de slices
  security: securitySlice.reducer,
  auth: authSlice.reducer,
  task: taskSlice.reducer,
  event: eventSlice.reducer,
  calendarDay: calendarDaySlice.reducer,
  // UI
  modal: modalSlice.reducer,
  toast: toastSlice.reducer,
})
