import { ReactNode, useState } from 'react'

import { SidebarContext } from './SidebarContext'

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev)
  const closeSidebar = () => setIsSidebarCollapsed(() => true)

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
