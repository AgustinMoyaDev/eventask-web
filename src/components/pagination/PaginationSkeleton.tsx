import { Skeleton } from '../skeletons/Skeleton'

import styles from './Pagination.module.css'

export const PaginationSkeleton = () => {
  return (
    <nav className={styles.pagination} aria-label="Pagination navigation">
      <Skeleton width="2rem" height="2rem" />

      <div className={styles.paginationPages}>
        <Skeleton width="4rem" height="2rem" />
      </div>

      <Skeleton width="2rem" height="2rem" />
    </nav>
  )
}
