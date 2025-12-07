import { Skeleton } from '../skeletons/Skeleton'

import styles from './Header.module.css'

export const HeaderSkeleton = () => {
  return (
    <header className={styles.headerApp} aria-hidden="true">
      <nav className={`${styles.headerAppNav} container`}>
        <div className={styles.headerAppLogoContainer}>
          <Skeleton
            className={styles.headerAppHamburger}
            width={40}
            height={40}
            borderRadius="0.25rem"
          />

          <div className={styles.headerAppLogo} style={{ pointerEvents: 'none' }}>
            <Skeleton
              className={styles.headerAppLogoImg}
              width={32}
              height={32}
              borderRadius="50%"
            />
            <Skeleton className={styles.headerAppLogoText} width={100} height={24} />
          </div>
        </div>
        <div className={styles.headerAppActions}>
          <Skeleton width={40} height={40} borderRadius="50%" />
          <Skeleton width={40} height={40} borderRadius="50%" />
        </div>
      </nav>
    </header>
  )
}
