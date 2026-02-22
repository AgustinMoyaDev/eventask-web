import { HeaderSkeleton } from '@/components/header/HeaderSkeleton'
import { SidebarSkeleton } from '@/components/sidebar/SidebarSkeleton'
import { GenericContentSkeleton } from '@/components/skeletons/GenericContentSkeleton'

import styles from './MainLayout.module.css'
import clsx from 'clsx'

export const AppShellSkeleton = () => {
  return (
    <div className={styles.mainLayoutWrapper}>
      <HeaderSkeleton />
      <div className={`${styles.mainLayoutBody} container`}>
        <SidebarSkeleton />
        <main className={clsx('main', styles.mainContent)}>
          <GenericContentSkeleton />
        </main>
      </div>
    </div>
  )
}
