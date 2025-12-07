import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { TOAST_STATUS, ToastStatus } from '@/types/ui/toast'

import { IToast } from '@/types/ui/toast'

interface ToastState {
  toasts: IToast[]
}

const initialState: ToastState = {
  toasts: [],
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    onShowToast: {
      prepare: (
        message: string,
        status: ToastStatus = TOAST_STATUS.LOADING,
        duration: number = 3000
      ): { payload: IToast } => ({
        payload: {
          id: nanoid(),
          message,
          status,
          duration,
        },
      }),
      reducer: (state, { payload }: PayloadAction<IToast>) => {
        state.toasts.push(payload)
      },
    },
    onUpdateToastStatus: (state, { payload }: PayloadAction<IToast>) => {
      const toast = state.toasts.find(t => t.id === payload.id)
      if (toast) {
        toast.status = payload.status
        toast.message = payload.message
      }
    },
    onRemoveToast: (state, { payload }: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== payload)
    },
  },
})

export const { onShowToast, onUpdateToastStatus, onRemoveToast } = toastSlice.actions
