import { createListenerMiddleware } from '@reduxjs/toolkit'

import { baseApi } from '../../services/baseApi'
import { authApi } from '../../services/authApi'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening

/**
 * Clear all RTK Query cache when user logs out
 * This ensures no data from previous user sessions persists
 */
startAppListening({
  matcher: authApi.endpoints.logout.matchFulfilled,
  effect: async (_, listenerApi) => {
    // Reset all RTK Query cache to prevent data leakage between users
    listenerApi.dispatch(baseApi.util.resetApiState())
  },
})
