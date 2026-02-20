import { matchPath } from 'react-router-dom'

export const breadcrumbMap: Record<string, string | ((params: Record<string, string>) => string)> =
  {
    '/home': 'Home',
    '/see-all': 'Overview',
    '/task/:id': ({ id }) => `Task ID: ...${id.slice(20, id.length)}`,
    '/task/new': 'New task form',
    '/task/:id/edit': 'Edit task form',
    '/calendar': 'Calendar',
    '/profile': 'Profile',
  }

export function getBreadcrumbLabel(pathname: string, search: string): string {
  const params = new URLSearchParams(search)
  const type = params.get('type')

  if (pathname === '/see-all' && type) {
    return `${type.charAt(0).toUpperCase() + type.slice(1)} overview`
  }

  for (const [routePath, crumb] of Object.entries(breadcrumbMap)) {
    const match = matchPath(routePath, pathname)
    if (match) {
      return typeof crumb === 'function' ? crumb(match.params as Record<string, string>) : crumb
    }
  }

  return 'Invalid path'
}
