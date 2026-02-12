import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { BreadcrumbNavigation } from '@/types/ui/breadcrumb'

import { NavigationContext } from '@/context/navigation/NavigationContext'

import { getBreadcrumbLabel } from './getBreadcrumbLabels'

export function useNavigation(): BreadcrumbNavigation {
  const navigationContext = useContext(NavigationContext)
  if (!navigationContext) {
    throw new Error('NavigationContext must be used within a NavigationProvider')
  }

  const location = useLocation()
  const { breadcrumbs, setBreadcrumbs } = navigationContext

  useEffect(() => {
    const newPath = location.pathname
    const fullPath = `${newPath}${location.search}`
    const newLabel = getBreadcrumbLabel(newPath, location.search)

    setBreadcrumbs(prev => {
      // If it's already the last breadcrumb, we don't do anything.
      if (prev.length > 0 && prev[prev.length - 1].path === fullPath) {
        return prev
      }

      // If it exists earlier in the list, we replace it to avoid repetition
      const existingIndex = prev.findIndex(item => {
        return item.path === fullPath || item.label === newLabel
      })

      if (existingIndex >= 0) {
        return [...prev.slice(0, existingIndex), { path: fullPath, label: newLabel }]
      }

      // If we're going to Home, we reset the breadcrumb
      if (newLabel === 'Home') return [{ path: fullPath, label: newLabel }]

      if (prev.length >= 3) {
        // Limit to last 3 breadcrumbs
        return [...prev.slice(1), { path: fullPath, label: newLabel }]
      }

      // If it doesn't exist, we add it to the end
      return [...prev, { path: fullPath, label: newLabel }]
    })
  }, [location.pathname, location.search, setBreadcrumbs])

  return { breadcrumbs }
}
