import { Socket } from 'socket.io-client'

import { Notification } from '@/types/entities/notification'

export interface ConnectionData {
  userId: string
  timestamp: string
}

export interface ServerToClientEvents {
  notification: (notification: Notification) => void
  connected: (data: ConnectionData) => void
  error: (error: string) => void
}

export interface ClientToServerEvents {
  // standard events built in Socket.IO
  connect: () => void
  disconnect: () => void
  connect_error: (error: Error) => void
}

export type AuthenticatedSocket = Socket<ServerToClientEvents, ClientToServerEvents>
