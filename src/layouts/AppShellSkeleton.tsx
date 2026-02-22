import { HeaderSkeleton } from '@/components/header/HeaderSkeleton'
import { SidebarSkeleton } from '@/components/sidebar/SidebarSkeleton'
import { GenericContentSkeleton } from '@/components/skeletons/GenericContentSkeleton'

import styles from './MainLayout.module.css'

export const AppShellSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />
      <main className="main">
        <div className={`${styles.mainLayout} container`}>
          <SidebarSkeleton />
          <div className={styles.mainLayoutContent}>
            <GenericContentSkeleton />
          </div>
        </div>
      </main>
    </>
  )
}
