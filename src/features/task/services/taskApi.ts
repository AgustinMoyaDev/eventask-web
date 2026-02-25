import { baseApi } from '@/services/baseApi'

import { PaginationOptions, PaginationResult } from '@/types/dtos/api/pagination'
import { CreateTaskDto, ParticipantDto, UpdateTaskDto } from '@/types/dtos/task.dto'
import { Task, TaskId } from '@/types/entities/task'

export const taskApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchTasks: builder.query<PaginationResult<Task>, PaginationOptions>({
      query: ({ page = 1, perPage = 10, sortBy, sortOrder } = {}) => ({
        url: '/tasks',
        method: 'GET',
        params: { page, perPage, ...(sortBy && { sortBy }), ...(sortOrder && { sortOrder }) },
      }),
      providesTags: result =>
        result
          ? [
              { type: 'Task', id: 'LIST' },
              ...(result?.items.map(({ id }) => ({ type: 'Task' as const, id })) ?? []),
            ]
          : [],
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
      invalidatesTags: result =>
        result
          ? [
              { type: 'Task', id: 'LIST' },
              { type: 'Category', id: 'LIST-COUNT' },
            ]
          : [],
    }),
    updateTask: builder.mutation<Task, UpdateTaskDto>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, _optimisticCategory, ...patch }, { dispatch, queryFulfilled }) {
        const optimisticPatchResult = dispatch(
          taskApi.util.updateQueryData('fetchTaskById', id, draft => {
            // draft: mutable proxy object (Immer)
            Object.assign(draft, patch)
            if (_optimisticCategory) {
              draft.category = _optimisticCategory
              draft.categoryId = _optimisticCategory.id
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          optimisticPatchResult.undo()
        }
      },
      invalidatesTags: result => {
        if (!result) return []

        return [
          { type: 'Task', id: result.id },
          ...(result.categoryId ? [{ type: 'Category' as const, id: 'LIST-COUNT' }] : []),
        ]
      },
    }),
    deleteTask: builder.mutation<void, TaskId>({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, error, _arg) =>
        !error
          ? [
              { type: 'Task', id: 'LIST' },
              { type: 'Category', id: 'LIST-COUNT' },
            ]
          : [],
    }),
    assignParticipant: builder.mutation<Task, ParticipantDto>({
      query: ({ taskId, participantId }) => ({
        url: `/tasks/${taskId}/participants/${participantId}`,
        method: 'POST',
      }),
      async onQueryStarted(
        { taskId, participantId, _optimisticParticipant },
        { dispatch, queryFulfilled }
      ) {
        const optimisticResult = dispatch(
          taskApi.util.updateQueryData('fetchTaskById', taskId, draft => {
            draft.participants ??= []
            draft.participantsIds ??= []
            // Avoid duplicate entries if user clicks add multiple times quickly
            const alreadyExists = draft.participants.some(p => p.id === participantId)
            if (!alreadyExists && _optimisticParticipant) {
              draft.participants.push(_optimisticParticipant)
              draft.participantsIds.push(_optimisticParticipant.id)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          optimisticResult.undo()
        }
      },
      invalidatesTags: (result, _error, _arg) => (result ? [{ type: 'Task', id: result.id }] : []),
    }),
    removeParticipant: builder.mutation<Task, ParticipantDto>({
      query: ({ taskId, participantId }) => ({
        url: `/tasks/${taskId}/participants/${participantId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ taskId, participantId }, { dispatch, queryFulfilled }) {
        const optimisticResult = dispatch(
          taskApi.util.updateQueryData('fetchTaskById', taskId, draft => {
            draft.participants ??= []
            draft.participantsIds ??= []

            const index = draft.participants.findIndex(p => p.id === participantId)

            if (index !== -1) {
              draft.participants.splice(index, 1)
              draft.participantsIds.splice(index, 1)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          optimisticResult.undo()
        }
      },
      invalidatesTags: result => (result ? [{ type: 'Task', id: result.id }] : []),
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
