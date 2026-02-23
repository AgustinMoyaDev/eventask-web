import { createSelector } from '@reduxjs/toolkit'
import { tasksAdapter } from '@/task/store/slice/taskSlice'
import { RootState } from '@/store/store'

export const selectTaskState = (state: RootState) => state.task

export const {
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors<RootState>(selectTaskState)

export const selectActiveTaskId = (state: RootState) => state.task.activeTaskId

export const selectActiveTask = createSelector(
  [selectActiveTaskId, selectTaskEntities],
  (activeId, entities) => (activeId ? entities[activeId] : undefined)
)
