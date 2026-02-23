import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useAuthState } from '@/features/auth/store/hooks/useAuthState'

import { UserAvatarDropdown } from '@/features/user/components/user-avatar-dropdown/UserAvatarDropdown'
import { ButtonTheme } from '@/components/button-theme/ButtonTheme'
import { NotificationDropdown } from '@/features/notification/components/notification-dropdown/NotificationDropdown'
import { AppLogoMenu } from '@/components/app-logo-menu/AppLogoMenu'

import styles from './Header.module.css'

export const Header = () => {
  const { isAuthenticated } = useAuthState()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={clsx(styles.headerApp, isScrolled && styles.headerAppScrolled)}>
      <nav className={clsx(styles.headerAppNav, 'container')} aria-label="Profile navigation">
        <AppLogoMenu />

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
