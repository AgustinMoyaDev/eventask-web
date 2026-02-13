import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useBreadcrumbContext } from '@/context/breadcrumb/BreadcrumbContext'
import { useSidebarContext } from '@/context/sidebar/SidebarContext'

import { SeparatorIcon } from '@/components/icons/Icons'

import styles from './Breadcrumb.module.css'

export const Breadcrumb = () => {
  const { isSidebarCollapsed } = useSidebarContext()
  const { breadcrumbs } = useBreadcrumbContext()
  const lastCrumbIndex = breadcrumbs?.length - 1

  if (!breadcrumbs.length) return null

  return (
    <nav
      aria-label="breadcrumb"
      className={clsx(styles.breadcrumb, !isSidebarCollapsed && styles.breadcrumbHidden)}
    >
      <ol className={styles.breadcrumbList}>
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className={styles.breadcrumbItem}>
            {index < lastCrumbIndex ? (
              <>
                <Link to={item.path} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
                <span className={styles.breadcrumbSeparator}>
                  <SeparatorIcon className={styles.breadcrumbSeparatorIcon} />
                </span>
              </>
            ) : (
              <span
                className={styles.breadcrumbCurrent}
                aria-current={index === lastCrumbIndex ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
