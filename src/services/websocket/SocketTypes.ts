import { Socket } from 'socket.io-client'

import { INotification } from '@/types/INotification'

export interface ConnectionData {
  userId: string
  timestamp: string
}

export interface ServerToClientEvents {
  notification: (notification: INotification) => void
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
