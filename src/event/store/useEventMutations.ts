import { useMemo } from 'react'

import { parseRTKError } from '@/services/utils/parseRTKError'
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useUpdateEventStatusMutation,
  useAssignCollaboratorMutation,
  useRemoveCollaboratorMutation,
} from '@/services/eventApi'

export const useEventMutations = () => {
  const [createEvent, { isLoading: creating, error: createRawError }] = useCreateEventMutation()
  const [updateEvent, { isLoading: updating, error: updateRawError }] = useUpdateEventMutation()
  const [updateEventStatus, { isLoading: updatingStatus, error: updateEvtStatusRawError }] =
    useUpdateEventStatusMutation()
  const [deleteEvent, { isLoading: deleting, error: deleteRawError }] = useDeleteEventMutation()
  const [
    assignCollaborator,
    { isLoading: assigningCollaborator, error: assignCollaboratorRawError },
  ] = useAssignCollaboratorMutation()
  const [
    removeCollaborator,
    { isLoading: removingCollaborator, error: removeCollaboratorRawError },
  ] = useRemoveCollaboratorMutation()

  const createEventError = useMemo(() => parseRTKError(createRawError), [createRawError])
  const updateEventError = useMemo(() => parseRTKError(updateRawError), [updateRawError])
  const updateEventStatusError = useMemo(
    () => parseRTKError(updateEvtStatusRawError),
    [updateEvtStatusRawError]
  )
  const deleteEventError = useMemo(() => parseRTKError(deleteRawError), [deleteRawError])
  const assignCollaboratorError = useMemo(
    () => parseRTKError(assignCollaboratorRawError),
    [assignCollaboratorRawError]
  )
  const removeCollaboratorError = useMemo(
    () => parseRTKError(removeCollaboratorRawError),
    [removeCollaboratorRawError]
  )

  return {
    // Mutations
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent,
    assignCollaborator,
    removeCollaborator,
    // flags
    creating,
    updating,
    deleting,
    updatingStatus,
    assigningCollaborator,
    removingCollaborator,
    // RTKQ errors
    createEventError,
    updateEventError,
    updateEventStatusError,
    deleteEventError,
    assignCollaboratorError,
    removeCollaboratorError,
  }
}
