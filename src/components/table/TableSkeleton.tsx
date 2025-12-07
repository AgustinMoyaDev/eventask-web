import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './Table.module.css'

export function TableSkeleton() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableHeadRow}>
            {Array.from({ length: 4 }).map((_, index) => (
              <th key={index} className={styles.tableHeader}>
                <Skeleton width="3rem" height="1rem" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {Array.from({ length: 5 }).map((_, rowIndex) => {
            const rowId = `skeleton-row-${rowIndex}`

            return (
              <tr key={rowId} className={styles.tableBodyRow}>
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <td key={`skeleton-col-${index}`} className={styles.tableBodyData}>
                      <Skeleton width="3rem" height="1rem" />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
