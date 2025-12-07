import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { csrfToken: '' }

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    setCsrfToken: (state, { payload }: PayloadAction<string>) => {
      state.csrfToken = payload
    },
  },
})

export const { setCsrfToken } = securitySlice.actions
