import { RouteMatch } from 'react-router-dom'

export interface BreadcrumbItem {
  path: string
  label: string
  icon?: React.ReactNode
}

export interface BreadcrumbNavigation {
  breadcrumbs: {
    path: string
    label: string
  }[]
}

// Extended type for TypeScript to recognize crumb
export type MatchWithCrumb = RouteMatch & {
  handle?: {
    crumb?: string | ((match: RouteMatch) => string)
  }
}
