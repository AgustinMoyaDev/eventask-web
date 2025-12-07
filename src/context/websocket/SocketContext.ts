import { createContext, useContext } from 'react'

interface SocketContextType {
  isConnected: boolean
  socketId: string | null
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }
  return context
}
