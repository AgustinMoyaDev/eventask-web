import { Skeleton } from '../skeletons/Skeleton'
import styles from './AppLogoMenu.module.css'

export const AppLogoMenuSkeleton = () => {
  return (
    <div className={styles.appLogoContainer}>
      <Skeleton className={styles.appHamburger} width={150} height={50} />
    </div>
  )
}
