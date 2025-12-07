import { taskApi } from '@/services/taskApi'

import { registerToastFor } from './toastHelper'

const { fetchTaskById, fetchTasks, createTask, updateTask, deleteTask } = taskApi.endpoints

const taskOperation = {
  endpoints: {
    matchPending: fetchTaskById.matchPending,
    matchFulfilled: fetchTaskById.matchFulfilled,
    matchRejected: fetchTaskById.matchRejected,
  },
  messages: {
    loading: 'Loading task…',
    success: 'Task loaded',
    error: 'Error loading task',
  },
}

const listTaskOperation = {
  endpoints: {
    matchPending: fetchTasks.matchPending,
    matchFulfilled: fetchTasks.matchFulfilled,
    matchRejected: fetchTasks.matchRejected,
  },
  messages: {
    loading: 'Loading tasks…',
    success: 'Tasks loaded',
    error: 'Error loading tasks',
  },
}

const createTaskOperation = {
  endpoints: {
    matchPending: createTask.matchPending,
    matchFulfilled: createTask.matchFulfilled,
    matchRejected: createTask.matchRejected,
  },
  messages: {
    loading: 'Creating task…',
    success: 'Task created',
    error: 'Error creating task',
  },
}

const updateTaskOperation = {
  endpoints: {
    matchPending: updateTask.matchPending,
    matchFulfilled: updateTask.matchFulfilled,
    matchRejected: updateTask.matchRejected,
  },
  messages: {
    loading: 'Updating task…',
    success: 'Task updated',
    error: 'Error updating task',
  },
}

const deleteTaskOperation = {
  endpoints: {
    matchPending: deleteTask.matchPending,
    matchFulfilled: deleteTask.matchFulfilled,
    matchRejected: deleteTask.matchRejected,
  },
  messages: {
    loading: 'Deleting task…',
    success: 'Task deleted',
    error: 'Error deleting task',
  },
}

const toastTaskOperations = [
  taskOperation,
  listTaskOperation,
  createTaskOperation,
  updateTaskOperation,
  deleteTaskOperation,
]

toastTaskOperations.forEach(({ endpoints, messages }) => registerToastFor({ endpoints, messages }))
