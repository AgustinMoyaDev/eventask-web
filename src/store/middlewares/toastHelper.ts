import { UnknownAction } from '@reduxjs/toolkit'

import { TOAST_STATUS } from '@/types/ui/toast'

import { startAppListening } from './listenerMiddleware'
import { onShowToast, onUpdateToastStatus } from '../slices/ui/toastSlice'

interface RTKQAction extends UnknownAction {
  meta?: {
    requestId: string
  }
}

export interface ToastOperation {
  endpoints: {
    matchPending: (action: UnknownAction) => boolean
    matchFulfilled: (action: UnknownAction) => boolean
    matchRejected: (action: UnknownAction) => boolean
  }
  messages: {
    loading: string
    success: string
    error: string
  }
}

export function registerToastFor({ endpoints, messages }: ToastOperation) {
  const toastMap = new Map<string, string>()

  startAppListening({
    predicate: endpoints.matchPending,
    effect: ({ meta }: RTKQAction, listenerApi) => {
      const requestId = meta?.requestId
      if (!requestId) return

      const { payload } = listenerApi.dispatch(onShowToast(messages.loading, TOAST_STATUS.LOADING))
      toastMap.set(requestId, payload.id)
    },
  })

  startAppListening({
    predicate: endpoints.matchFulfilled,
    effect: ({ meta }: RTKQAction, listenerApi) => {
      const requestId = meta?.requestId
      const toastId = requestId && toastMap.get(requestId)
      if (!toastId) return

      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: messages.success,
          status: TOAST_STATUS.SUCCESS,
        })
      )
      toastMap.delete(requestId)
    },
  })

  startAppListening({
    predicate: endpoints.matchRejected,
    effect: ({ meta }: RTKQAction, listenerApi) => {
      const requestId = meta?.requestId
      const toastId = requestId && toastMap.get(requestId)
      if (!toastId) return

      listenerApi.dispatch(
        onUpdateToastStatus({ id: toastId, message: messages.error, status: TOAST_STATUS.ERROR })
      )
      toastMap.delete(requestId)
    },
  })
}
