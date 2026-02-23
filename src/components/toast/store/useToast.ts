import { useCallback } from 'react'

import { ToastStatus } from '@/components/toast/toast.types'

import { useAppDispatch, useAppSelector } from '@/store/reduxStore'
import { onShowToast, onUpdateToastStatus, onRemoveToast } from './toastSlice'

export const useToast = () => {
  const dispatch = useAppDispatch()
  const { toastList } = useAppSelector(state => state.toast)

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
    toastList,
    showToast,
    updateToastStatus,
    removeToast,
  }
}
