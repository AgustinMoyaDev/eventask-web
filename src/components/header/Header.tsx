import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { useAuthState } from '@/auth/store/hooks/useAuthState'
import { useSidebarContext } from '@/context/sidebar/SidebarContext'

import { UserAvatarDropdown } from '@/user/components/user-avatar-dropdown/UserAvatarDropdown'
import { ButtonTheme } from '@/components/button-theme/ButtonTheme'
import { NotificationDropdown } from '@/notification/components/notification-dropdown/NotificationDropdown'
import { Button } from '@/components/button/Button'
import { MenuIcon } from '@/components/icons/Icons'

import styles from './Header.module.css'

export const Header = () => {
  const { isAuthenticated } = useAuthState()
  const { toggleSidebar } = useSidebarContext()
  const location = useLocation()

  const imgLogo = '/images/appLogo.webp'
  const isHome = location.pathname === '/home'
  const isLanding = location.pathname === '/'

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome || isLanding) {
      event.preventDefault()
    }
  }

  return (
    <header className={clsx(styles.headerApp, isScrolled && styles.headerAppScrolled)}>
      <nav className={clsx(styles.headerAppNav, 'container')} aria-label="Profile navigation">
        <div className={styles.headerAppLogoContainer}>
          {isAuthenticated && (
            <Button
              variant="icon"
              size="sm"
              className={styles.headerAppHamburger}
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <MenuIcon />
            </Button>
          )}

          <Link
            className={styles.headerAppLogo}
            to={isAuthenticated ? '/home' : '/'}
            onClick={handleNavigation}
          >
            <img className={styles.headerAppLogoImg} src={imgLogo} alt="EvenTask logo" />
            <span className={clsx('text-title-md', styles.headerAppLogoText)}>EvenTask</span>
          </Link>
        </div>

        {isAuthenticated ? (
          <div className={styles.headerAppActions}>
            <NotificationDropdown size="md" maxNotifications={5} />
            <UserAvatarDropdown />
          </div>
        ) : (
          <ButtonTheme />
        )}
      </nav>
    </header>
  )
}
