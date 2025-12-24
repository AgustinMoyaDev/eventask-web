import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

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

import { SortConfig } from '@/types/ui/table'

import { useAppSelector, useAppDispatch } from '../reduxStore'
import { selectActiveEvent } from '../selectors/event'
import { resetActiveEventId, setActiveEventId } from '../slices/event/eventSlice'

export const useEventActions = (
  page = 1,
  perPage = 5,
  shouldFetch = true,
  sortConfig?: SortConfig
) => {
  const activeEvent = useAppSelector(selectActiveEvent)
  const dispatch = useAppDispatch()

  const setActiveEvent = (id: string) => dispatch(setActiveEventId(id))
  const clearActiveEvent = () => dispatch(resetActiveEventId())

  const { accessToken } = useAppSelector(state => state.auth)
  const canGetEvents = useMemo(() => {
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
    data: { items: events = [], total = 0 } = {},
    isFetching: fetching,
    error: fetchEventsError,
    refetch,
  } = useFetchEventsByUserQuery(canGetEvents)
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
    fetch: fetchAllEventsError,
    fetch: fetchMonthlyEventsCalendarError,
    create: createEventError,
    update: updateEventError,
    updateEventStatus: updateEventStatusError,
    delete: deleteEventError,
    assignCollaborator: addCollaboratorError,
    removeCollaborator: deleteCollaboratorError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchEventsError },
        { operation: OperationError.CREATE, error: createError },
        { operation: OperationError.UPDATE, error: updateError },
        { operation: OperationError.UPDATE_EVENT_STATUS, error: updateEvtStatusError },
        { operation: OperationError.DELETE, error: deleteError },
        { operation: OperationError.ASSIGN_COLLABORATOR, error: assignCollaboratorError },
        { operation: OperationError.REMOVE_COLLABORATOR, error: removeCollaboratorError },
      ]),
    [
      fetchEventsError,
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
    total,
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
    fetchAllEventsError,
    fetchMonthlyEventsCalendarError,
    createEventError,
    updateEventError,
    updateEventStatusError,
    deleteEventError,
    addCollaboratorError,
    deleteCollaboratorError,
  }
}
