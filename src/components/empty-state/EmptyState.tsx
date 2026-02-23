import { ReactNode } from 'react'

import { GhostIcon } from '@/components/icons/Icons'

import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export const EmptyState = ({
  title,
  description,
  icon = <GhostIcon />,
  action,
  className = '',
}: EmptyStateProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}

      <div className={styles.content}>
        <h3 className={`text-headline-sm ${styles.title}`}>{title}</h3>

        {description && <p className={`text-body-md ${styles.description}`}>{description}</p>}
      </div>

      {action && <div className={styles.actionWrapper}>{action}</div>}
    </div>
  )
}
