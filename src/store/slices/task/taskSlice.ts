import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { taskApi } from '@/services/taskApi'
import { authApi } from '@/services/authApi'

import { Task } from '@/types/entities/task'

export const tasksAdapter = createEntityAdapter<Task>()

export interface ITaskState {
  activeTaskId?: string
}

const initialState = tasksAdapter.getInitialState<ITaskState>({
  activeTaskId: undefined,
})

const { fetchTasks, createTask, updateTask, deleteTask } = taskApi.endpoints

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.removeOne,
    setActiveTaskId: (state, { payload }: PayloadAction<string | undefined>) => {
      state.activeTaskId = payload
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(fetchTasks.matchFulfilled, (state, { payload: { items } }) => {
        tasksAdapter.setAll(state, items)
      })
      .addMatcher(createTask.matchFulfilled, (state, { payload }) => {
        tasksAdapter.upsertOne(state, payload)
      })
      .addMatcher(updateTask.matchFulfilled, (state, { payload }) => {
        tasksAdapter.upsertOne(state, payload)
      })
      .addMatcher(deleteTask.matchFulfilled, (state, action) => {
        const deletedId = action.meta.arg.originalArgs
        tasksAdapter.removeOne(state, deletedId)
        if (state.activeTaskId === deletedId) state.activeTaskId = undefined
      })
      // Clear all tasks when user logs out
      .addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
        tasksAdapter.removeAll(state)
        state.activeTaskId = undefined
      })
  },
})

export const { setActiveTaskId } = taskSlice.actions
