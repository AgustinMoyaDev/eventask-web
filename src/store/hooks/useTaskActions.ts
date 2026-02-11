import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { SortConfig } from '@/types/ui/table'

import { getErrorMessage, OperationError } from '@/services/utils/getErrorMessage'

import {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '@/services/taskApi'

import { useAppSelector } from '../reduxStore'
import { setActiveTaskId } from '../slices/task/taskSlice'

export const useTaskActions = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const { accessToken } = useAppSelector(state => state.auth)
  const canGetTasks = useMemo(() => {
    if (!accessToken || page < 0 || perPage <= 0 || !shouldFetch) {
      return skipToken
    }

    return {
      page,
      perPage,
      ...(sortConfig?.key &&
        sortConfig.direction && {
          sortBy: sortConfig.key,
          sortOrder: sortConfig.direction,
        }),
    }
  }, [accessToken, page, perPage, shouldFetch, sortConfig])

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
