import { RootState } from '@/store/store'

export const selectSecurityState = (state: RootState) => state.security

export const selectCsrfToken = (state: RootState) => selectSecurityState(state).csrfToken
