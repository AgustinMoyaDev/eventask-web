import { AppLogoMenuSkeleton } from '@/components/app-logo-menu/AppLogoMenuSkeleton'
import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './Header.module.css'

export const HeaderSkeleton = () => {
  return (
    <header className={styles.headerApp} aria-hidden="true">
      <nav className={`${styles.headerAppNav} container`}>
        <AppLogoMenuSkeleton />
        <div className={styles.headerAppActions}>
          <Skeleton width={40} height={40} borderRadius="50%" />
          <Skeleton width={40} height={40} borderRadius="50%" />
        </div>
      </nav>
    </header>
  )
}
