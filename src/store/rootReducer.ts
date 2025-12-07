import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '../services/baseApi'

import { authSlice } from './slices/auth/authSlice'
import { userSlice } from './slices/user/userSlice'
import { taskSlice } from './slices/task/taskSlice'
import { calendarDaySlice } from './slices/calendar/calendarDaySlice'
import { eventSlice } from './slices/event/eventSlice'
import { modalSlice } from './slices/ui/modalSlice'
import { toastSlice } from './slices/ui/toastSlice'
import { securitySlice } from './slices/security/security'

export const rootReducer = combineReducers({
  // Reducer de RTK Query para baseApi
  [baseApi.reducerPath]: baseApi.reducer,
  // Reducers de slices
  security: securitySlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  task: taskSlice.reducer,
  event: eventSlice.reducer,
  calendarDay: calendarDaySlice.reducer,
  // UI
  modal: modalSlice.reducer,
  toast: toastSlice.reducer,
})
