/**
 * Custom hook that manages the event modal state and logic
 * Separates modal concerns from main form logic
 */
import { useState, useEffect, useCallback, useRef } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ModalIds } from '@/types/ui/modal'
import { IEventLocal } from '@/types/IEvent'

import { useModalActions } from '@/store/hooks/useModalActions'

interface UseTaskFormEventModalProps {
  events: IEventLocal[]
  handleAddModalEvent: (evt: IEventLocal) => void
  handleEditModalEvent: (evt: IEventLocal) => void
}

export const useTaskFormEventModal = ({
  events,
  handleAddModalEvent,
  handleEditModalEvent,
}: UseTaskFormEventModalProps) => {
  const [editingEvent, setEditingEvent] = useState<IEventLocal | undefined>(undefined)
  const { isOpen, open, close } = useModalActions(ModalIds.EventForm)
  const [searchParams, setSearchParams] = useSearchParams()
  const processedRef = useRef<string | null>(null)

  // Handle opening event from external state (e.g., from calendar)
  useEffect(() => {
    const editId = searchParams.get('editEvent')
    if (!editId || processedRef.current === editId) return

    const found = events.find(e => e.id === editId)
    if (found) {
      processedRef.current = editId
      setEditingEvent(found)
      open()
    }
  }, [searchParams, setSearchParams, events, open, close])

  const handleOpenNewEvent = useCallback(() => {
    setEditingEvent(undefined)
    open()
  }, [open])

  const handleOpenEditEvent = useCallback(
    (evt: IEventLocal) => {
      setEditingEvent(evt)
      open()
    },
    [open]
  )

  const handleCloseModal = useCallback(() => {
    setEditingEvent(undefined)
    close()
    setSearchParams({}, { replace: true })
  }, [close, setSearchParams])

  const handleCreateEvent = useCallback(
    (evt: IEventLocal) => {
      handleAddModalEvent(evt)
      handleCloseModal()
    },
    [handleAddModalEvent, handleCloseModal]
  )

  const handleUpdateEvent = useCallback(
    (evt: IEventLocal) => {
      handleEditModalEvent(evt)
      handleCloseModal()
    },
    [handleEditModalEvent, handleCloseModal]
  )

  return {
    isOpen,
    editingEvent,
    handleOpenNewEvent,
    handleOpenEditEvent,
    handleCreateEvent,
    handleUpdateEvent,
    handleCloseModal,
  }
}
