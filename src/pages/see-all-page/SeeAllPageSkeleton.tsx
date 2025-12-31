import clsx from 'clsx'

import { PaginationSkeleton } from '@/components/pagination/PaginationSkeleton'
import { TableSkeleton } from '@/components/table/TableSkeleton'

import styles from './SeeAllPage.module.css'

const SeeAllPageSkeleton = () => {
  return (
    <div className={clsx(styles.seeAllPage, 'section')} role="status" aria-label="Loading">
      <section className={styles.tableView}>
        <TableSkeleton />
        <PaginationSkeleton />
      </section>
    </div>
  )
}

export default SeeAllPageSkeleton
