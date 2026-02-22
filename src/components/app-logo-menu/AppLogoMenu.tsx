import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useSidebarContext } from '@/context/sidebar/SidebarContext'
import { useAuthState } from '@/auth/store/hooks/useAuthState'

import { Button } from '@/components/button/Button'
import { MenuIcon } from '@/components/icons/Icons'

import styles from './AppLogoMenu.module.css'

export const AppLogoMenu = () => {
  const imgLogo = '/images/appLogo.webp'
  const isHome = location.pathname === '/home'
  const isLanding = location.pathname === '/'
  const { isAuthenticated } = useAuthState()
  const { toggleSidebar } = useSidebarContext()

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome || isLanding) {
      event.preventDefault()
    }
  }

  return (
    <div className={styles.appLogoContainer}>
      {isAuthenticated && (
        <Button
          variant="icon"
          size="sm"
          className={styles.appHamburger}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </Button>
      )}

      <Link
        className={styles.appLogo}
        to={isAuthenticated ? '/home' : '/'}
        onClick={handleNavigation}
        viewTransition
      >
        <img className={styles.appLogoImg} src={imgLogo} alt="EvenTask logo" />
        <span className={clsx('text-title-md', styles.appLogoText)}>EvenTask</span>
      </Link>
    </div>
  )
}
