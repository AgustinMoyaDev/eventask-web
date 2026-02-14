import clsx from 'clsx'

import { Base } from '@/types/entities/base'
import { SortDirection, TableProps } from './table.types'

import {
  SortAscIcon,
  SortDescIcon,
  EditIcon,
  DeleteIcon,
  SeeDetailsIcon,
} from '@/components/icons/Icons'

import { Button } from '@/components/button/Button'

import styles from './Table.module.css'

export function Table<T extends Base>({
  columns = [],
  data,
  getItemId,
  onView,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: TableProps<T>) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeads}>
          <tr className={styles.tableHeadRow}>
            {columns.map(({ label, key, sortable }) => (
              <th
                key={label}
                className={clsx(styles.tableHeader, {
                  [styles.tableHeaderSortable]: sortable,
                  [styles.tableHeaderActive]: sortBy === key,
                })}
                onClick={() => sortable && onSort?.(String(key))}
              >
                {label}
                {sortBy === key && (
                  <Button variant="icon" size="sm">
                    {sortOrder === SortDirection.ASC ? (
                      <SortAscIcon size={18} />
                    ) : (
                      <SortDescIcon size={18} />
                    )}
                  </Button>
                )}
              </th>
            ))}
            {(onEdit ?? onDelete ?? onView) && (
              <th className={clsx(styles.tableHeader, styles.tableHeaderActions)}>Actions</th>
            )}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {data.map(item => {
            const id = getItemId(item)

            return (
              <tr key={id} className={styles.tableBodyRow}>
                {columns.map(col => {
                  if (col.render) {
                    return (
                      <td key={String(col.key)} className={styles.tableBodyData}>
                        {col.render(item)}
                      </td>
                    )
                  }

                  const value = item[col.key as keyof T]
                  const displayValue = value != null ? String(value) : '---'
                  return (
                    <td key={String(col.key) + id} className={styles.tableBodyData}>
                      {displayValue}
                    </td>
                  )
                })}

                {(onEdit ?? onDelete ?? onView) && (
                  <td className={clsx(styles.tableBodyData, styles.tableBodyDataActions)}>
                    {onView && (
                      <Button
                        className={styles.tableActionBtn}
                        variant="icon"
                        size="sm"
                        onClick={() => onView(id)}
                        aria-label={`View item ${id}`}
                      >
                        <SeeDetailsIcon />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        className={styles.tableActionBtn}
                        variant="icon"
                        size="sm"
                        onClick={() => onEdit(id)}
                        aria-label={`Edit item ${id}`}
                      >
                        <EditIcon />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        className={styles.tableActionBtn}
                        variant="icon"
                        size="sm"
                        onClick={() => onDelete(id)}
                        aria-label={`Delete item ${id}`}
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
