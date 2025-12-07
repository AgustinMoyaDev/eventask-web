import { clsx } from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './Sidebar.module.css'

export const SidebarSkeleton = () => {
  return (
    <aside className={clsx(styles.sidebar, styles.sidebarCollapsed)} aria-hidden="true">
      <nav className={styles.sidebarNav} aria-label="Main navigation">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.sidebarLink} style={{ padding: '0' }}>
            <Skeleton width="3rem" height="3rem" borderRadius="50%" />
            <Skeleton width="3rem" height="0.5rem" />
          </div>
        ))}
      </nav>
    </aside>
  )
}
