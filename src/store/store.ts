import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '../services/baseApi'

import { rootReducer } from './rootReducer'
import { listenerMiddleware } from './middlewares/listenerMiddleware'

import { registerToastListeners } from './middlewares/registerToastListeners'

registerToastListeners()

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      /**
       * Listener middleware for handling side effects in response to dispatched
       * actions (e.g., showing toasts, clearing cache on logout)
       */
      .prepend(listenerMiddleware.middleware)
      /**
       * RTK Query middleware for caching, automatic refetching, and handling
       * API lifecycle actions
       * RTK Query middleware must be added after listenerMiddleware to ensure
       * listeners can react to RTK Query actions
       */
      .concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
