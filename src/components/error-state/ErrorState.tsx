import { ReactNode } from 'react'

import { AlertIcon } from '@/components/icons/Icons'
import { Button } from '@/components/button/Button'
import { EmptyState } from '@/components/empty-state/EmptyState'

import styles from './ErrorState.module.css'

interface ErrorStateProps {
  title?: string
  description?: string
  action?: ReactNode
  onRetry?: () => void
}

export const ErrorState = ({
  title = 'Something went wrong',
  description = "We couldn't load the information. Please check your connection and try again.",
  action,
  onRetry,
}: ErrorStateProps) => {
  const defaultAction = onRetry ? (
    <Button onClick={onRetry} variant="filled">
      Retry
    </Button>
  ) : null

  return (
    <EmptyState
      icon={<AlertIcon size={48} className={styles.errorIcon} />}
      title={title}
      description={description}
      action={action ?? defaultAction}
    />
  )
}
