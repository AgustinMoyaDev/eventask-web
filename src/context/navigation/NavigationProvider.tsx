import { useEffect, useState } from 'react'

import { BreadcrumbItem } from '@/types/ui/breadcrumb'

import { NavigationContext } from './NavigationContext'

interface Props {
  children: React.ReactNode
}

export const NavigationProvider = ({ children }: Props) => {
  // a) Hydrate while riding
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>(() => {
    const stored = localStorage.getItem('breadcrumbs')
    try {
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // b) Persist every time they change
  useEffect(() => {
    try {
      localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs))
    } catch (error) {
      console.error('Error saving breadcrumbs to localStorage:', error)
    }
  }, [breadcrumbs])

  return (
    <NavigationContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
