import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '../services/baseApi'

import { rootReducer } from './rootReducer'
import { listenerMiddleware } from './listenerMiddleware'

// Custom middlewares imports
import './middlewares/categoryToastMiddleware'
import './middlewares/taskToastMiddleware'
import './middlewares/userToastMiddleware'
import './middlewares/invitationToastMiddleware'
import './middlewares/notificationToastMiddleware'
import './middlewares/eventToastMiddleware'
import './middlewares/authToastMiddleware'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // El listenerMiddleware para todos los startAppListening
      .prepend(listenerMiddleware.middleware)
      // El middleware de RTK Query para cache y refetch automático
      .concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
