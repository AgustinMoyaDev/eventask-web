import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { getErrorMessage, OperationError } from '@/api/helpers/getErrorMessage'

import {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '@/services/taskApi'

import { useAppSelector } from '../reduxStore'
import { setActiveTaskId } from '../slices/task/taskSlice'

export const useTaskActions = (page = 0, perPage = 5, shouldFetch = true) => {
  const { accessToken } = useAppSelector(state => state.auth)
  const canGetTasks =
    accessToken && page >= 0 && perPage > 0 && shouldFetch ? { page, perPage } : skipToken

  const {
    data: { items: tasks = [], total = 0 } = {},
    isFetching: fetching,
    error: fetchError,
    refetch,
  } = useFetchTasksQuery(canGetTasks)
  const [createTask, { isSuccess: createSuccess, isLoading: creating, error: createError }] =
    useCreateTaskMutation()
  const [updateTask, { isSuccess: updateSuccess, isLoading: updating, error: updateError }] =
    useUpdateTaskMutation()
  const [deleteTask, { isSuccess: deleteSuccess, isLoading: deleting, error: deleteError }] =
    useDeleteTaskMutation()

  const {
    fetch: fetchTaskError,
    create: createTaskError,
    update: updateTaskError,
    delete: deleteTaskError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchError },
        { operation: OperationError.CREATE, error: createError },
        { operation: OperationError.UPDATE, error: updateError },
        { operation: OperationError.DELETE, error: deleteError },
      ]),
    [fetchError, createError, updateError, deleteError]
  )

  return {
    // state
    setActiveTaskId,
    // RTKQ Data and flags
    tasks,
    total,
    fetching,
    creating,
    updating,
    deleting,
    refetch,
    // RTKQ mutations
    createTask,
    createSuccess,
    updateTask,
    updateSuccess,
    deleteTask,
    deleteSuccess,
    // RTKQ parsed errors
    fetchTaskError,
    createTaskError,
    updateTaskError,
    deleteTaskError,
  }
}
