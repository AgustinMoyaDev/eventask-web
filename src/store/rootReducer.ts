import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '../services/baseApi'

import { authSlice } from '@/auth/store/authSlice'
import { taskSlice } from '../task/store/slice/taskSlice'
import { calendarDaySlice } from '../calendar/store/calendarDaySlice'
import { eventSlice } from '../event/store/slice/eventSlice'
import { securitySlice } from './slices/security/securitySlice'
import { modalSlice } from '@/components/modal/store/modalSlice'
import { toastSlice } from '@/components/toast/store/toastSlice'

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
