import { io, ManagerOptions, SocketOptions } from 'socket.io-client'

import { AuthenticatedSocket, ConnectionData } from './SocketTypes'

import { store } from '@/store/store'
import { setCredentials } from '@/store/slices/auth/authSlice'

import { authApi } from '../authApi'

import { getEnvVariables } from '@/helpers/getEnvVariables'

const { VITE_BACKEND_URL, DEV } = getEnvVariables()

/**
 * Determine transports based on environment
 * When using MSW (demo mode), force polling-only to ensure MSW can intercept
 * In normal mode, prefer websocket for better performance
 * @see https://socket.io/docs/v4/client-options/#transports
 */
const transports =
  import.meta.env.MODE === 'development' || import.meta.env.MODE === 'demo'
    ? ['polling']
    : ['websocket', 'polling']

const socketOptions = {
  transports,
  autoConnect: false, // connect manually after auth
  auth: (cb: (auth: { token?: string }) => void) => {
    const state = store.getState()
    const token = state.auth.accessToken
    cb({ token })
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
} as Partial<ManagerOptions & SocketOptions>

const socket: AuthenticatedSocket = io(VITE_BACKEND_URL, socketOptions)

if (DEV) {
  console.log(`🔌 Socket.io configured with transports: [${transports.join(', ')}]`)
}

socket.on('connected', (data: ConnectionData) => {
  if (DEV) console.log('Socket connected:', data)
})

socket.on('disconnect', (reason: string) => {
  if (DEV) console.log('Socket disconnected:', reason)
})

socket.on('connect_error', async (error: Error) => {
  console.error('Socket connection error:', { error })

  if (error.message.includes('Authentication failed')) {
    if (DEV) console.log('Attempting token refresh...')

    store
      // Dispatch refresh using RTK Query
      .dispatch(authApi.endpoints.refresh.initiate())
      .unwrap()
      .then(refreshResult => {
        // Update credentials in store
        store.dispatch(setCredentials(refreshResult))
        // Retry connection with new token
        socket.auth = { token: refreshResult.accessToken }
        socket.connect()
      })
      .catch(error => {
        console.error('Token refresh failed:', error)
        // Handle logout or user notification
        store.dispatch(authApi.endpoints.logout.initiate())
      })
  }
})

// Function to connect (call after login)
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

// Function to disconnect (call on logout)
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}

export default socket
