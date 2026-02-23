import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Toast, TOAST_STATUS, ToastStatus } from '@/components/toast/toast.types'

interface ToastState {
  toastList: Toast[]
}

const initialState: ToastState = {
  toastList: [],
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    onShowToast: {
      prepare: (
        message: string,
        status: ToastStatus = TOAST_STATUS.LOADING,
        duration = 3000
      ): { payload: Toast } => ({
        payload: {
          id: nanoid(),
          message,
          status,
          duration,
        },
      }),
      reducer: (state, { payload }: PayloadAction<Toast>) => {
        state.toastList.push(payload)
      },
    },
    onUpdateToastStatus: (state, { payload }: PayloadAction<Toast>) => {
      const toast = state.toastList.find(t => t.id === payload.id)
      if (toast) {
        toast.status = payload.status
        toast.message = payload.message
      }
    },
    onRemoveToast: (state, { payload }: PayloadAction<string>) => {
      state.toastList = state.toastList.filter(t => t.id !== payload)
    },
  },
})

export const { onShowToast, onUpdateToastStatus, onRemoveToast } = toastSlice.actions
