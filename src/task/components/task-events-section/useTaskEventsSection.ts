import { useState, useCallback } from 'react'

import { ModalIds } from '@/components/modal/modal.types'

import { useEventMutations } from '@/event/store/hooks/useEventMutations'
import { useModalState } from '@/components/modal/store/useModalState'
import { useModalActions } from '@/components/modal/store/useModalActions'

import { CreateEventDto, UpdateEventDto } from '@/types/dtos/event.dto'
import { EventFormModel } from '@/types/models/event.model'

/**
 * Custom hook for managing task events section logic
 * Handles modal state and event CRUD operations
 */
export const useTaskEventsSection = (taskId: string) => {
  const [editingEvent, setEditingEvent] = useState<EventFormModel | null>(null)
  const { isOpen } = useModalState(ModalIds.EventForm)
  const { open, close } = useModalActions(ModalIds.EventForm)
  const { createEvent, updateEvent, deleteEvent, creating, updating } = useEventMutations()

  const handleOpenNew = useCallback(() => {
    setEditingEvent(null)
    open()
  }, [open])

  const handleOpenEdit = useCallback(
    (event: EventFormModel) => {
      setEditingEvent(event)
      open()
    },
    [open]
  )

  const handleClose = useCallback(() => {
    setEditingEvent(null)
    close()
  }, [close])

  const handleCreateEvent = useCallback(
    async (event: EventFormModel) => {
      const payload: CreateEventDto = {
        title: event.title,
        start: event.start,
        end: event.end,
        notes: event.notes,
        taskId,
      }

      const result = await createEvent(payload)

      if (!result?.error) {
        handleClose()
      }
    },
    [taskId, createEvent, handleClose]
  )

  const handleUpdateEvent = useCallback(
    async (event: EventFormModel) => {
      const payload: UpdateEventDto = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        notes: event.notes,
        status: event.status,
        taskId,
      }

      const result = await updateEvent(payload)
      if (!result?.error) {
        handleClose()
      }
    },
    [taskId, updateEvent, handleClose]
  )

  const handleDeleteEvent = useCallback(
    async (eventId: string) => {
      const result = await deleteEvent({ id: eventId, taskId })
      if (!result?.error) {
        handleClose()
      }
    },
    [taskId, deleteEvent, handleClose]
  )

  return {
    isModalOpen: isOpen,
    editingEvent,
    handleOpenNew,
    handleOpenEdit,
    handleClose,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    isCreating: creating,
    isUpdating: updating,
  }
}
