import { useCallback } from 'react'

import { ToastStatus } from '@/types/ui/toast'

import { useAppDispatch, useAppSelector } from '../reduxStore'
import { onShowToast, onUpdateToastStatus, onRemoveToast } from '../slices/ui/toastSlice'

export const useToastActions = () => {
  const dispatch = useAppDispatch()
  const { toasts } = useAppSelector(state => state.toast)

  const showToast = useCallback(
    (message: string, status: ToastStatus) => dispatch(onShowToast(message, status)),
    [dispatch]
  )

  const updateToastStatus = useCallback(
    (toastId: string, status: ToastStatus) =>
      dispatch(onUpdateToastStatus({ id: toastId, message: 'Default message', status })),
    [dispatch]
  )

  const removeToast = useCallback((toastId: string) => dispatch(onRemoveToast(toastId)), [dispatch])

  return {
    //* Properties
    toasts,
    //* Methods
    showToast,
    updateToastStatus,
    removeToast,
  }
}
