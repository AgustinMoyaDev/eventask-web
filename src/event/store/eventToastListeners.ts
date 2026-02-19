import { eventApi } from '@/services/eventApi'
import { registerToastFor } from '@/components/toast/store/toastHelper'

export function registerEventToastListeners() {
  const { createEvent, updateEvent, assignCollaborator, removeCollaborator } = eventApi.endpoints

  const createEventOperation = {
    endpoints: {
      matchPending: createEvent.matchPending,
      matchFulfilled: createEvent.matchFulfilled,
      matchRejected: createEvent.matchRejected,
    },
    messages: {
      loading: 'Creating event…',
      success: 'Event created successfully',
      error: 'Error creating event',
    },
  }

  const updateEventOperation = {
    endpoints: {
      matchPending: updateEvent.matchPending,
      matchFulfilled: updateEvent.matchFulfilled,
      matchRejected: updateEvent.matchRejected,
    },
    messages: {
      loading: 'Updating event…',
      success: 'Event updated successfully',
      error: 'Error updating event',
    },
  }

  const deleteEventOperation = {
    endpoints: {
      matchPending: eventApi.endpoints.deleteEvent.matchPending,
      matchFulfilled: eventApi.endpoints.deleteEvent.matchFulfilled,
      matchRejected: eventApi.endpoints.deleteEvent.matchRejected,
    },
    messages: {
      loading: 'Deleting event…',
      success: 'Event deleted successfully',
      error: 'Error deleting event',
    },
  }

  const assignCollaboratorOperation = {
    endpoints: {
      matchPending: assignCollaborator.matchPending,
      matchFulfilled: assignCollaborator.matchFulfilled,
      matchRejected: assignCollaborator.matchRejected,
    },
    messages: {
      loading: 'Assigning collaborator…',
      success: 'Collaborator assigned successfully',
      error: 'Error assigning collaborator',
    },
  }

  const removeCollaboratorOperation = {
    endpoints: {
      matchPending: removeCollaborator.matchPending,
      matchFulfilled: removeCollaborator.matchFulfilled,
      matchRejected: removeCollaborator.matchRejected,
    },
    messages: {
      loading: 'Removing collaborator…',
      success: 'Collaborator removed successfully',
      error: 'Error removing collaborator',
    },
  }

  const toastEventOperations = [
    createEventOperation,
    updateEventOperation,
    deleteEventOperation,
    assignCollaboratorOperation,
    removeCollaboratorOperation,
  ]

  toastEventOperations.forEach(({ endpoints, messages }) =>
    registerToastFor({ endpoints, messages })
  )
}
