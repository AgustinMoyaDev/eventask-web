import React, { createContext, useEffect, useState } from 'react'

import { baseApi } from '@/services/baseApi'

import socket, { connectSocket, disconnectSocket } from '@/services/websocket/SocketService'

import { useAppDispatch, useAppSelector } from '@/store/reduxStore'

import { INotification } from '@/types/INotification'

interface SocketContextType {
  isConnected: boolean
  socketId: string | null
}

const SocketContext = createContext<SocketContextType | null>(null)

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [socketId, setSocketId] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  // Get auth state to ensure connection after login
  const isAuthenticated = useAppSelector(state => !!state.auth.accessToken)

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket()
    }

    const handleConnect = () => {
      if (!socket) {
        console.error('Socket not initialized')
        return
      }
      setIsConnected(true)
      setSocketId(socket.id || null)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      setSocketId(null)
    }

    const handleConnectError = (error: Error) => {
      console.error('Socket connection error:', error.message)
    }

    const handleNotification = (notification: INotification) => {
      if (!notification) return
      dispatch(baseApi.util.invalidateTags(['Notification', 'User', 'Task', 'Event']))
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)
    socket.on('notification', handleNotification)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
      socket.off('notification', handleNotification)
      disconnectSocket()
    }
  }, [isAuthenticated, dispatch])

  return (
    <SocketContext.Provider value={{ isConnected, socketId }}>{children}</SocketContext.Provider>
  )
}
