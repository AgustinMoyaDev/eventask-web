import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { SIDEBAR_MENU_ITEMS } from './constants/sidebar.constants'

import { SidebarProps } from './sidebar.types'

import styles from './Sidebar.module.css'

export const Sidebar = ({ isCollapsed, onClose }: SidebarProps) => {
  const location = useLocation()

  const handleNavClick = () => {
    if (window.innerWidth < 991) onClose()
  }

  /**
   * Check if link is active including query params
   * Needed because multiple links go to /see-all with different ?type
   */
  const isLinkActive = (to: string) => {
    const [pathname, search] = to.split('?')
    const currentPath = location.pathname
    const currentSearch = location.search.slice(1) // Remove leading '?'
    return currentPath === pathname && (!search || currentSearch === search)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {!isCollapsed && <div className={styles.sidebarBackdrop} onClick={onClose} />}

      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, isCollapsed && styles.sidebarCollapsed)}>
        <nav className={styles.sidebarNav} aria-label="Main navigation">
          {SIDEBAR_MENU_ITEMS.map(({ to, label, icon: Icon }) => {
            const isActive = isLinkActive(to)
            return (
              <NavLink
                key={to}
                to={to}
                className={() => clsx(styles.sidebarLink, isActive && styles.sidebarLinkActive)}
                onClick={handleNavClick}
              >
                <Icon className={styles.sidebarIcon} />
                <span className={styles.sidebarText}>{label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
