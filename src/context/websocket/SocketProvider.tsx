import React, { useEffect, useMemo, useState } from 'react'

import { Notification } from '@/types/entities/notification'

import { baseApi } from '@/services/baseApi'
import socket, { connectSocket, disconnectSocket } from '@/services/websocket/SocketService'

import { useAppDispatch } from '@/store/reduxStore'
import { useAuthState } from '@/features/auth/store/hooks/useAuthState'

import { SocketContext } from './SocketContext'

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [socketId, setSocketId] = useState<string | null>(socket.id ?? null)

  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuthState()

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket()
      return
    }

    connectSocket()

    const handleConnect = () => {
      if (!socket) {
        console.error('Socket not initialized')
        return
      }
      setIsConnected(true)
      setSocketId(socket.id ?? null)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      setSocketId(null)
    }

    const handleConnectError = (error: Error) => {
      console.error('Socket connection error:', error.message)
    }

    const handleNotification = (notification: Notification) => {
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

  const value = useMemo(
    () => ({
      isConnected,
      socketId,
    }),
    [isConnected, socketId]
  )

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
