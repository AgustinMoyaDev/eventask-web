import { useMemo } from 'react'

import { parseRTKError } from '@/services/utils/parseRTKError'
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useUpdateEventStatusMutation,
  useAssignCollaboratorMutation,
  useRemoveCollaboratorMutation,
} from '@/features/event/services/eventApi'

export const useEventMutations = () => {
  const [createEvent, { isLoading: creating, error: createError }] = useCreateEventMutation()
  const [updateEvent, { isLoading: updating, error: updateError }] = useUpdateEventMutation()
  const [updateEventStatus, { isLoading: updatingStatus, error: updateStatusError }] =
    useUpdateEventStatusMutation()
  const [deleteEvent, { isLoading: deleting, error: deleteError }] = useDeleteEventMutation()
  const [assignCollaborator, { isLoading: assigningCollaborator, error: assignError }] =
    useAssignCollaboratorMutation()
  const [removeCollaborator, { isLoading: removingCollaborator, error: removeError }] =
    useRemoveCollaboratorMutation()

  const errors = useMemo(() => {
    const rawErrors = {
      create: createError,
      update: updateError,
      updateStatus: updateStatusError,
      delete: deleteError,
      assignCollaborator: assignError,
      removeCollaborator: removeError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [createError, updateError, updateStatusError, deleteError, assignError, removeError])

  return {
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent,
    assignCollaborator,
    removeCollaborator,
    creating,
    updating,
    deleting,
    updatingStatus,
    assigningCollaborator,
    removingCollaborator,
    errors,
  }
}
