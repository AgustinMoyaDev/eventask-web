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
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
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
  }),
  overrideExisting: false,
})

export const {
  useFetchTasksQuery,
  useFetchTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi
