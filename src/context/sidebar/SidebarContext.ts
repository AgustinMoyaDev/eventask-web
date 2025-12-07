import { createContext, useContext } from 'react'

interface SidebarContextType {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within SidebarProvider')
  }
  return context
}
