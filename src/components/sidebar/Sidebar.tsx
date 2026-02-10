import { NavLink, useLocation } from 'react-router-dom'

import clsx from 'clsx'

import {
  CalendarIcon,
  ClockIcon,
  ContactsIcon,
  HomeIcon,
  PlusIcon,
  UserSettingIcon,
} from '@/components/icons/Icons'

import { SidebarProps } from '@/types/ui/sidebar'

import styles from './Sidebar.module.css'

const menuItems = [
  { to: '/home', label: 'Home', icon: <HomeIcon className={styles.sidebarIcon} /> },
  {
    to: '/task/new',
    label: 'New Task',
    icon: <PlusIcon className={styles.sidebarIcon} />,
  },
  {
    to: '/calendar',
    label: 'Calendar',
    icon: <CalendarIcon className={styles.sidebarIcon} />,
  },
  {
    to: '/see-all?type=events',
    label: 'Events',
    icon: <ClockIcon className={styles.sidebarIcon} />,
  },
  {
    to: '/see-all?type=contacts',
    label: 'Contacts',
    icon: <ContactsIcon className={styles.sidebarIcon} />,
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: <UserSettingIcon className={styles.sidebarIcon} />,
  },
]

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
          {menuItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={() =>
                clsx(styles.sidebarLink, isLinkActive(to) && styles.sidebarLinkActive)
              }
              onClick={handleNavClick}
            >
              {icon}
              <span className={styles.sidebarText}>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
