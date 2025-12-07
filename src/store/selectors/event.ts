import { createSelector } from '@reduxjs/toolkit'

import { eventsAdapter } from '../slices/event/eventSlice'
import { RootState } from '../store'

export const {
  selectEntities: selectEventsEntities, // -> { 'e1': {...}, 'e2': {...}, … }
  selectAll: selectAllEvents, // -> [ {...}, {...}, … ]
  selectById: selectEventById,
  selectIds: selectEventIds,
} = eventsAdapter.getSelectors<RootState>(state => state.event)

// 1. Extraemos selectActiveEventId y selectEntities
export const selectActiveEventId = (state: RootState) => state.event.activeEventId

// 2. Selector memoizado que combina ambas entradas
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
