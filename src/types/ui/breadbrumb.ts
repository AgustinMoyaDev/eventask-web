import { RouteMatch } from 'react-router-dom'

export type BreadcrumbItem = {
  path: string
  label: string
  icon?: React.ReactNode
}

export type BreadcrumbNavigation = {
  breadcrumbs: Array<{
    path: string
    label: string
  }>
}

// Extended type for TypeScript to recognize crumb
export type MatchWithCrumb = RouteMatch & {
  handle?: {
    crumb?: string | ((match: RouteMatch) => string)
  }
}
