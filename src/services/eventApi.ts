import { baseApi } from './baseApi'

import { IPaginationOptions, IPaginationResult } from '../api/types/pagination'

import { Event } from '../types/entities/event'
import {
  CreateEventDto,
  UpdateEventDto,
  UpdateEventStatusDto,
  EventCalendarResponseDto,
  EventCalendarQueryDto,
} from '../types/dtos/event.dto'

export const eventApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchEventsByUser: builder.query<IPaginationResult<Event>, IPaginationOptions>({
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
    fetchEventsByMonth: builder.query<EventCalendarResponseDto, EventCalendarQueryDto>({
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
    updateEventStatus: builder.mutation<Event, UpdateEventStatusDto>({
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
              { type: 'Task', id: result.taskId },
            ]
          : [],
    }),
    createEvent: builder.mutation<Event, CreateEventDto>({
      query: newEvent => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Event', id: 'LIST' },
        { type: 'Task', id: arg.taskId },
      ],
    }),
    updateEvent: builder.mutation<Event, UpdateEventDto>({
      query: event => ({
        url: `/events/${event.id}`,
        method: 'PUT',
        body: event,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Event', id: 'LIST' },
        { type: 'Event', id: arg.id },
        { type: 'Task', id: arg.taskId },
      ],
    }),
    deleteEvent: builder.mutation<{ id: string }, { id: string; taskId: string }>({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Event', id: 'LIST' },
        { type: 'Task', id: arg.taskId },
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
