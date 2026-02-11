export const TOAST_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type ToastStatus = (typeof TOAST_STATUS)[keyof typeof TOAST_STATUS]

export interface Toast {
  id: string
  message: string
  status: ToastStatus
  duration?: number
}

export interface ToastProps {
  toast: Toast
  removeToast: (id: string) => void
}
