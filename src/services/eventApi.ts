import { baseApi } from './baseApi'

import { IPaginationOptions, IPaginationResult } from '../api/types/pagination'

import { IEvent, IEventCalendarQueryParams, IEventCalendarResult } from '../types/IEvent'
import { IEventCreatePayload, IEventStatusPayload, IEventUpdatePayload } from '../types/dtos/event'

export const eventApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchEventsByUser: builder.query<IPaginationResult<IEvent>, IPaginationOptions>({
      query: ({ page = 1, perPage = 10, sortBy, sortOrder } = {}) => ({
        url: '/events',
        method: 'GET',
        params: { page, perPage, ...(sortBy && { sortBy }), ...(sortOrder && { sortOrder }) },
      }),
      providesTags: result => [
        { type: 'Event', id: 'LIST' },
        ...(result?.items.map(evt => ({ type: 'Event' as const, id: evt.id })) ?? []),
      ],
    }),
    fetchEventsByMonth: builder.query<IEventCalendarResult, IEventCalendarQueryParams>({
      query: ({ year, month }) => ({
        url: '/events/calendar',
        method: 'GET',
        params: { year, month },
      }),
      providesTags: result => [
        { type: 'Event', id: 'LIST' },
        ...(result?.events.map(evt => ({ type: 'Event' as const, id: evt.id })) ?? []),
      ],
    }),
    createEvent: builder.mutation<IEvent, IEventCreatePayload>({
      query: newEvent => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEventStatus: builder.mutation<IEvent, IEventStatusPayload>({
      query: ({ id, status }) => ({
        url: `/events/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: result =>
        result
          ? [
              { type: 'Event', id: 'LIST' },
              { type: 'Event', id: result.id },
              { type: 'Task', id: result.taskId! },
              { type: 'Task', id: 'LIST' },
            ]
          : [],
    }),
    updateEvent: builder.mutation<IEvent, IEventUpdatePayload>({
      query: event => ({
        url: `/events/${event.id}`,
        method: 'PUT',
        body: event,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Event', id: 'LIST' },
        { type: 'Event', id: arg.id },
      ],
    }),
    deleteEvent: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [
        { type: 'Event', id: 'LIST' },
        { type: 'Task', id: 'LIST' },
      ],
    }),
    /**
     * Assign a participant (user) as collaborator to an event.
     * @param payload - { eventId, participantId }
     */
    assignCollaborator: builder.mutation<void, { eventId: string; collaboratorId: string }>({
      query: ({ eventId, collaboratorId }) => ({
        url: `/events/${eventId}/collaborators/${collaboratorId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Event', 'Task'],
    }),
    /**
     * Remove a collaborator from an event.
     * @param payload - { eventId, collaboratorId }
     */
    removeCollaborator: builder.mutation<void, { eventId: string; collaboratorId: string }>({
      query: ({ eventId, collaboratorId }) => ({
        url: `/events/${eventId}/collaborators/${collaboratorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event', 'Task'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchEventsByUserQuery,
  useFetchEventsByMonthQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useUpdateEventStatusMutation,
  useDeleteEventMutation,
  useAssignCollaboratorMutation,
  useRemoveCollaboratorMutation,
} = eventApi
