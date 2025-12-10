import { Dispatch, createContext, SetStateAction, useContext } from 'react'

import { BreadcrumbItem } from '@/types/ui/breadbrumb'

interface NavigationContextType {
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: Dispatch<SetStateAction<BreadcrumbItem[]>>
}

export const NavigationContext = createContext<NavigationContextType>({
  breadcrumbs: [],
  setBreadcrumbs: () => {
    /* no-op */
  },
})

export const useNavigationContext = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider')
  }
  return context
}
