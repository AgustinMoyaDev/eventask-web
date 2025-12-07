import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { TOAST_STATUS, ToastProps } from '@/types/ui/toast'

import { CheckIcon, ErrorIcon } from '@/components/icons/Icons'

import styles from './Toast.module.css'

const EXIT_ANIMATION_DURATION = 300 // must match CSS

/**
 * Toast renders a single notification, handles its own timeout
 * and exposes appropriate ARIA role for screen readers.
 */
export const Toast = ({ toast, removeToast }: ToastProps) => {
  const { id, message, status, duration = 0 } = toast
  const [isExiting, setIsExiting] = useState(false)
  const exitTimeoutRef = useRef<NodeJS.Timeout>()
  const removeTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (status !== TOAST_STATUS.LOADING) {
      // At the end of duration, we start the exit
      exitTimeoutRef.current = setTimeout(() => {
        setIsExiting(true)
      }, duration)

      // After the exit animation, we remove it
      removeTimeoutRef.current = setTimeout(() => {
        removeToast(id)
      }, duration + EXIT_ANIMATION_DURATION)

      // Cleanup if the component unmounts before
      return () => {
        clearTimeout(exitTimeoutRef.current)
        clearTimeout(removeTimeoutRef.current)
      }
    }
  }, [status, duration, id, removeToast])

  return (
    <div
      className={clsx(styles.toast, styles[status], isExiting && styles.toastExiting)}
      role={status === TOAST_STATUS.ERROR ? 'alert' : 'status'}
      aria-live="off"
    >
      {status === TOAST_STATUS.LOADING && <span className={styles.toastLoader} />}
      {status === TOAST_STATUS.SUCCESS && (
        <span className={styles.toastIcon}>
          <CheckIcon />
        </span>
      )}

      {status === TOAST_STATUS.ERROR && (
        <span className={styles.toastIcon}>
          <ErrorIcon />
        </span>
      )}

      <span className={styles.toastMessage}>{message}</span>

      {status !== TOAST_STATUS.LOADING && (
        <span className={styles.toastProgress} style={{ animationDuration: `${duration}ms` }} />
      )}
    </div>
  )
}
