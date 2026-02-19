import { useMemo } from 'react'

import { parseRTKError } from '@/services/utils/parseRTKError'
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '@/services/taskApi'

export const useTaskMutations = () => {
  const [createTask, { isSuccess: createSuccess, isLoading: creating, error: createTaskRawError }] =
    useCreateTaskMutation()
  const [updateTask, { isSuccess: updateSuccess, isLoading: updating, error: updateTaskRawError }] =
    useUpdateTaskMutation()
  const [deleteTask, { isSuccess: deleteSuccess, isLoading: deleting, error: deleteTaskRawError }] =
    useDeleteTaskMutation()

  const createTaskError = useMemo(() => parseRTKError(createTaskRawError), [createTaskRawError])
  const updateTaskError = useMemo(() => parseRTKError(updateTaskRawError), [updateTaskRawError])
  const deleteTaskError = useMemo(() => parseRTKError(deleteTaskRawError), [deleteTaskRawError])

  return {
    createTask,
    updateTask,
    deleteTask,
    createSuccess,
    updateSuccess,
    deleteSuccess,
    creating,
    updating,
    deleting,
    createTaskError,
    updateTaskError,
    deleteTaskError,
  }
}
