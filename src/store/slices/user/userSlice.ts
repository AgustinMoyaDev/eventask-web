import { createSlice } from '@reduxjs/toolkit'

import { User } from '@/types/entities/user'

interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})
