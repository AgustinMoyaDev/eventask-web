import { useToast } from '@/components/toast/store/useToast'

import { Toast } from '@/components/toast/Toast'

import styles from './ToastContainer.module.css'

/**
 * ToastContainer renders all active toasts and provides
 * a polite live region for screen readers.
 */
export const ToastContainer = () => {
  const { toastList, removeToast } = useToast()

  return (
    <div className={styles.toastContainer} role="status" aria-live="polite">
      {toastList.map(toast => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}
