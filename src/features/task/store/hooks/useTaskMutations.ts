import { useMemo } from 'react'

import { parseRTKError } from '@/services/utils/parseRTKError'
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAssignParticipantMutation,
  useRemoveParticipantMutation,
} from '@/features/task/services/taskApi'

export const useTaskMutations = () => {
  const [createTask, { isSuccess: createSuccess, isLoading: creating, error: createError }] =
    useCreateTaskMutation()
  const [updateTask, { isSuccess: updateSuccess, isLoading: updating, error: updateError }] =
    useUpdateTaskMutation()
  const [deleteTask, { isSuccess: deleteSuccess, isLoading: deleting, error: deleteError }] =
    useDeleteTaskMutation()
  const [assignParticipant, { isLoading: isAssigning, error: assignError }] =
    useAssignParticipantMutation()
  const [removeParticipant, { isLoading: isRemoving, error: removeError }] =
    useRemoveParticipantMutation()

  const errors = useMemo(() => {
    const rawErrors = {
      create: createError,
      update: updateError,
      delete: deleteError,
      assignParticipant: assignError,
      removeParticipant: removeError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [createError, updateError, deleteError, assignError, removeError])

  return {
    createTask,
    updateTask,
    deleteTask,
    assignParticipant,
    removeParticipant,
    createSuccess,
    updateSuccess,
    deleteSuccess,
    creating,
    updating,
    deleting,
    isAssigning,
    isRemoving,
    errors,
  }
}
