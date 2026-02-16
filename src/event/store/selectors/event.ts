import { createSelector } from '@reduxjs/toolkit'

import { eventsAdapter } from '@/event/store/slice/eventSlice'
import { RootState } from '@/store/store'

export const selectEventState = (state: RootState) => state.event

export const {
  selectEntities: selectEventsEntities, // -> { 'e1': {...}, 'e2': {...}, … }
  selectAll: selectAllEvents, // -> [ {...}, {...}, … ]
  selectById: selectEventById,
  selectIds: selectEventIds,
} = eventsAdapter.getSelectors<RootState>(selectEventState)

// 1. Extract selectActiveEventId and selectEventsEntities
export const selectActiveEventId = (state: RootState) => state.event.activeEventId

// 2. Memoized selector that combines both inputs
export const selectActiveEvent = createSelector(
  [selectActiveEventId, selectEventsEntities],
  (activeId, entities) => (activeId ? entities[activeId] : undefined)
)

export const selectEventsByDate = (date: Date) =>
  createSelector(selectAllEvents, events =>
    events.filter(evt => {
      const startDate = new Date(evt.start)
      return (
        startDate.getFullYear() === date.getFullYear() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getDate() === date.getDate()
      )
    })
  )

/**
 * Returns events whose taskId matches the active event,
 * or [] if there is no active event.
 */
export const selectEventsByTask = createSelector(
  [selectActiveEvent, selectAllEvents],
  (activeEvent, events) =>
    activeEvent ? events.filter(evt => evt.taskId === activeEvent.taskId) : []
)
