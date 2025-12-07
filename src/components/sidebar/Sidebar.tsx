import { NavLink } from 'react-router-dom'

import clsx from 'clsx'

import { CalendarIcon, HomeIcon, PlusIcon, UserSettingIcon } from '@/components/icons/Icons'

import { SidebarProps } from '@/types/ui/sidebar'

import styles from './Sidebar.module.css'

const menuItems = [
  { to: '/home', label: 'Home', icon: <HomeIcon className={styles.sidebarIcon} /> },
  {
    to: '/task-form',
    label: 'New Task',
    icon: <PlusIcon className={styles.sidebarIcon} />,
  },
  {
    to: '/calendar',
    label: 'Calendar',
    icon: <CalendarIcon className={styles.sidebarIcon} />,
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: <UserSettingIcon className={styles.sidebarIcon} />,
  },
]

export const Sidebar = ({ isCollapsed, onClose }: SidebarProps) => {
  const handleNavClick = () => {
    if (window.innerWidth < 991) onClose()
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
              className={({ isActive }) =>
                clsx(styles.sidebarLink, isActive && styles.sidebarLinkActive)
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
