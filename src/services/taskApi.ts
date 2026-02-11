import { baseApi } from './baseApi'

import { PaginationOptions, PaginationResult } from '../types/dtos/api/pagination'

import { CreateTaskDto, UpdateTaskDto } from '../types/dtos/task.dto'
import { Task, TaskId } from '../types/entities/task'

export const taskApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchTasks: builder.query<PaginationResult<Task>, PaginationOptions>({
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
    fetchTaskById: builder.query<Task, TaskId>({
      query: id => `/tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),
    createTask: builder.mutation<Task, CreateTaskDto>({
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
    updateTask: builder.mutation<Task, UpdateTaskDto>({
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
    assignParticipant: builder.mutation<Task, { taskId: string; participantId: string }>({
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
    removeParticipant: builder.mutation<Task, { taskId: string; participantId: string }>({
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
