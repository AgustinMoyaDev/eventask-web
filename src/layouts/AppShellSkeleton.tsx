import { HeaderSkeleton } from '@/components/header/HeaderSkeleton'
import { SidebarSkeleton } from '@/components/sidebar/SidebarSkeleton'
import { GenericContentSkeleton } from '@/components/skeletons/GenericContentSkeleton'

import styles from './RootLayout.module.css'

export const AppShellSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />
      <main className="main">
        <div className={`${styles.rootLayout} container`}>
          <SidebarSkeleton />
          <div className={styles.rootLayoutContent}>
            <GenericContentSkeleton />
          </div>
        </div>
      </main>
    </>
  )
}
