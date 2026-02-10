import { baseApi } from './baseApi'

import { IPaginationOptions, IPaginationResult } from '../api/types/pagination'

import { ITaskCreatePayload, ITaskUpdatePayload } from '../types/dtos/task'
import { ITask, TaskId } from '../types/ITask'

export const taskApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchTasks: builder.query<IPaginationResult<ITask>, IPaginationOptions>({
      query: ({ page = 1, perPage = 10, sortBy, sortOrder } = {}) => ({
        url: '/tasks',
        method: 'GET',
        params: { page, perPage, ...(sortBy && { sortBy }), ...(sortOrder && { sortOrder }) },
      }),
      providesTags: result => [
        { type: 'Task', id: 'LIST' },
        ...(result?.items.map(({ id }) => ({ type: 'Task' as const, id })) ?? []),
      ],
    }),
    fetchTaskById: builder.query<ITask, TaskId>({
      query: id => `/tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),
    createTask: builder.mutation<ITask, ITaskCreatePayload>({
      query: newTask => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: [
        { type: 'Task', id: 'LIST' },
        { type: 'Category', id: 'LIST-COUNT' },
      ],
    }),
    updateTask: builder.mutation<ITask, ITaskUpdatePayload>({
      query: task => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: (_result, error, arg) => {
        if (error) return []
        return [
          { type: 'Task', id: 'LIST' },
          { type: 'Task', id: arg.id },
          { type: 'Event', id: 'LIST' },
        ]
      },
    }),
    deleteTask: builder.mutation<{ id: string }, TaskId>({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Task', id: 'LIST' }],
    }),
    assignParticipant: builder.mutation<ITask, { taskId: string; participantId: string }>({
      query: ({ taskId, participantId }) => ({
        url: `/tasks/${taskId}/participants/${participantId}`,
        method: 'POST',
      }),
      // Optimistic update
      // async onQueryStarted({ taskId, participantId }, { dispatch, queryFulfilled }) {
      // TODO: Update cache optimistically
      // },
      invalidatesTags: (_result, _error, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    removeParticipant: builder.mutation<ITask, { taskId: string; participantId: string }>({
      query: ({ taskId, participantId }) => ({
        url: `/tasks/${taskId}/participants/${participantId}`,
        method: 'DELETE',
      }),
      // Optimistic update
      // async onQueryStarted({ taskId, participantId }, { dispatch, queryFulfilled }) {
      // TODO: Update cache optimistically
      // },
      invalidatesTags: (_result, _error, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchTasksQuery,
  useFetchTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAssignParticipantMutation,
  useRemoveParticipantMutation,
} = taskApi
