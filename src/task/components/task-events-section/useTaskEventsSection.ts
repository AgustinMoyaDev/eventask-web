import { useState, useCallback } from 'react'

import { ModalIds } from '@/types/ui/modal'

import { useEventActions } from '@/store/hooks/useEventActions'
import { useModalActions } from '@/store/hooks/useModalActions'
import { IEventCreatePayload, IEventUpdatePayload } from '@/types/dtos/event'
import { EventForm } from '@/types/IEvent'

/**
 * Custom hook for managing task events section logic
 * Handles modal state and event CRUD operations
 */
export const useTaskEventsSection = (taskId: string) => {
  const [editingEvent, setEditingEvent] = useState<EventForm | null>(null)
  const { isOpen, open, close } = useModalActions(ModalIds.EventForm)
  const { createEvent, updateEvent, deleteEvent, creating, updating } = useEventActions()

  const handleOpenNew = useCallback(() => {
    setEditingEvent(null)
    open()
  }, [open])

  const handleOpenEdit = useCallback(
    (event: EventForm) => {
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
    async (event: IEventCreatePayload) => {
      const result = await createEvent({
        ...event,
        taskId,
      })

      if (!result?.error) {
        handleClose()
      }
    },
    [taskId, createEvent, handleClose]
  )

  const handleUpdateEvent = useCallback(
    async (event: IEventUpdatePayload) => {
      const result = await updateEvent({ ...event, taskId })
      if (!result?.error) {
        handleClose()
      }
    },
    [taskId, updateEvent, handleClose]
  )

  const handleDeleteEvent = useCallback(
    async (eventId: string) => {
      await deleteEvent({ id: eventId, taskId })
    },
    [deleteEvent, taskId]
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
