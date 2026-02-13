import { createContext, useContext } from 'react'

export interface BreadcrumbItem {
  path: string
  label: string
  icon?: React.ReactNode
}

export interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (items: BreadcrumbItem[]) => void
}

export const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null)

export const useBreadcrumbContext = () => {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider')
  }
  return context
}
