import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { getBreadcrumbLabel } from './helpers/getBreadcrumbLabels'
import { BreadcrumbContext, BreadcrumbItem } from './BreadcrumbContext'

interface BreadcrumbProviderProps {
  children: React.ReactNode
}

export const BreadcrumbProvider = ({ children }: BreadcrumbProviderProps) => {
  const location = useLocation()
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>(() => {
    try {
      const stored = localStorage.getItem('breadcrumbs')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs))
    } catch (error) {
      console.error('Error saving breadcrumbs:', error)
    }
  }, [breadcrumbs])

  // This effect synchronizes breadcrumb state with browser navigation (external system).
  // This is a valid use case per React docs: https://react.dev/reference/react/useEffect
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const newPath = location.pathname
    const search = location.search ?? ''
    const fullPath = `${newPath}${search}`
    const newLabel = getBreadcrumbLabel(newPath, search)

    setBreadcrumbs(prev => {
      // If the last breadcrumb is the same as the current path, we do nothing
      if (prev.length > 0 && prev[prev.length - 1].path === fullPath) {
        return prev
      }

      // If it exists earlier in the list, cut up to there and update label
      const existingIndex = prev.findIndex(item => {
        return item.path === fullPath || item.label === newLabel
      })
      if (existingIndex >= 0) {
        return [...prev.slice(0, existingIndex), { path: fullPath, label: newLabel }]
      }

      // Reset on Home Page
      if (newLabel === 'Home') return [{ path: fullPath, label: newLabel }]

      // Limit to 3 levels
      if (prev.length >= 3) {
        return [...prev.slice(1), { path: fullPath, label: newLabel }]
      }

      return [...prev, { path: fullPath, label: newLabel }]
    })
  }, [location.pathname, location.search])

  const value = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
    }),
    [breadcrumbs]
  )

  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
}
