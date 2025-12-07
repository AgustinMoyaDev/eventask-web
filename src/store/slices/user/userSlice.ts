import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/IUser'

interface UserState {
  users: IUser[]
}

const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})
