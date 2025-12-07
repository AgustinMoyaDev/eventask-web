import { useMemo } from 'react'

import {
  useFetchEventsByUserQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useUpdateEventStatusMutation,
  useAssignCollaboratorMutation,
  useRemoveCollaboratorMutation,
} from '@/services/eventApi'
import { getErrorMessage, OperationError } from '@/api/helpers/getErrorMessage'

import { useAppSelector, useAppDispatch } from '../reduxStore'
import { selectActiveEvent } from '../selectors/event'
import { resetActiveEventId, setActiveEventId } from '../slices/event/eventSlice'

export const useEventActions = () => {
  const activeEvent = useAppSelector(selectActiveEvent)
  const dispatch = useAppDispatch()

  const setActiveEvent = (id: string) => dispatch(setActiveEventId(id))
  const clearActiveEvent = () => dispatch(resetActiveEventId())

  const {
    data: { items: events = [] } = {},
    isFetching: fetching,
    error: fetchError,
    refetch,
  } = useFetchEventsByUserQuery()
  const [createEvent, { isLoading: creating, error: createError }] = useCreateEventMutation()
  const [updateEvent, { isLoading: updating, error: updateError }] = useUpdateEventMutation()
  const [updateEventStatus, { isLoading: updatingStatus, error: updateEvtStatusError }] =
    useUpdateEventStatusMutation()
  const [deleteEvent, { isLoading: deleting, error: deleteError }] = useDeleteEventMutation()
  const [assignCollaborator, { isLoading: assigningCollaborator, error: assignCollaboratorError }] =
    useAssignCollaboratorMutation()
  const [removeCollaborator, { isLoading: removingCollaborator, error: removeCollaboratorError }] =
    useRemoveCollaboratorMutation()

  const {
    fetch: fetchEventError,
    create: createEventError,
    update: updateEventError,
    updateEventStatus: updateEventStatusError,
    delete: deleteEventError,
    assignCollaborator: addCollaboratorError,
    removeCollaborator: deleteCollaboratorError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchError },
        { operation: OperationError.CREATE, error: createError },
        { operation: OperationError.UPDATE, error: updateError },
        { operation: OperationError.UPDATE_EVENT_STATUS, error: updateEvtStatusError },
        { operation: OperationError.DELETE, error: deleteError },
        { operation: OperationError.ASSIGN_COLLABORATOR, error: assignCollaboratorError },
        { operation: OperationError.REMOVE_COLLABORATOR, error: removeCollaboratorError },
      ]),
    [
      fetchError,
      createError,
      updateError,
      updateEvtStatusError,
      deleteError,
      assignCollaboratorError,
      removeCollaboratorError,
    ]
  )

  return {
    // STATE
    activeEvent,
    setActiveEvent,
    clearActiveEvent,
    // Data y flags RTKQ
    events,
    fetching,
    refetch,
    creating,
    updating,
    updatingStatus,
    deleting,
    assigningCollaborator,
    removingCollaborator,
    // Mutations RTKQ
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent,
    assignCollaborator,
    removeCollaborator,
    // RTKQ errors
    fetchEventError,
    createEventError,
    updateEventError,
    updateEventStatusError,
    deleteEventError,
    addCollaboratorError,
    deleteCollaboratorError,
  }
}
