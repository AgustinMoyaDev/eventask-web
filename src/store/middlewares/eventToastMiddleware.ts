import { eventApi } from '@/services/eventApi'

import { registerToastFor } from './toastHelper'

const { assignCollaborator, removeCollaborator } = eventApi.endpoints

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

const toastEventOperations = [assignCollaboratorOperation, removeCollaboratorOperation]

toastEventOperations.forEach(({ endpoints, messages }) => registerToastFor({ endpoints, messages }))
