import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
  openModals: Record<string, boolean>
}

const initialState: ModalState = {
  openModals: {},
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onOpen: (state, { payload }: PayloadAction<string>) => {
      state.openModals[payload] = true
    },
    onClose: (state, { payload }: PayloadAction<string>) => {
      state.openModals[payload] = false
    },
  },
})

export const { onOpen, onClose } = modalSlice.actions
