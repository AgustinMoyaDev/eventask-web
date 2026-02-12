import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AUTH_STATUS } from '@/auth/constants/auth-status'
import { authApi } from '@/services/authApi'

import { setCredentials } from './authActions'

export interface AuthState {
  status: string
  accessToken?: string
  currentUserId?: string
}

const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  currentUserId: undefined,
  accessToken: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const { login, loginWithGoogle, register, refresh, logout } = authApi.endpoints
    builder
      .addCase(setCredentials, (state, { payload }) => {
        state.currentUserId = payload.userId
        state.accessToken = payload.accessToken
        state.status = AUTH_STATUS.AUTHENTICATED
      })
      .addMatcher(refresh.matchPending, state => {
        state.status = AUTH_STATUS.CHECKING
      })
      .addMatcher(refresh.matchFulfilled, (state, { payload }) => {
        state.currentUserId = payload.userId
        state.accessToken = payload.accessToken
        state.status = AUTH_STATUS.AUTHENTICATED
      })
      .addMatcher(
        isAnyOf(login.matchFulfilled, loginWithGoogle.matchFulfilled, register.matchFulfilled),
        (state, { payload }) => {
          state.currentUserId = payload.userId
          state.accessToken = payload.accessToken
          state.status = AUTH_STATUS.AUTHENTICATED
        }
      )
      .addMatcher(isAnyOf(refresh.matchRejected, logout.matchFulfilled), state => {
        state.status = AUTH_STATUS.NOT_AUTHENTICATED
        state.currentUserId = undefined
        state.accessToken = undefined
      })
  },
})

export { setCredentials } from './authActions'
export default authSlice.reducer
