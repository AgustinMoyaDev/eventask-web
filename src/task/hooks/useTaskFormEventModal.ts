import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ModalIds } from '@/types/ui/modal'
import { IEventLocal } from '@/types/IEvent'

import { useModalActions } from '@/store/hooks/useModalActions'

interface UseTaskFormEventModalProps {
  events: IEventLocal[]
  handleAddModalEvent: (evt: IEventLocal) => void
  handleEditModalEvent: (evt: IEventLocal) => void
}

/**
 * Custom hook that manages the event modal state and logic
 * Separates modal concerns from main form logic
 */
export const useTaskFormEventModal = ({
  events,
  handleAddModalEvent,
  handleEditModalEvent,
}: UseTaskFormEventModalProps) => {
  const [searchParams] = useSearchParams()
  const [manualEditEvent, setManualEditEvent] = useState<IEventLocal | null>(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const { isOpen, open, close } = useModalActions(ModalIds.EventForm)
  const processedUrlRef = useRef<string | null>(null)

  const eventFromUrl = useMemo(() => {
    const editId = searchParams.get('editEvent')
    if (!editId) return null
    return events.find(e => e.id === editId) ?? null
  }, [searchParams, events])

  // Computed value: manual takes priority over URL
  const currentEvent = isCreatingNew ? null : (manualEditEvent ?? eventFromUrl)

  // Open modal ONLY when NEW event appears in URL
  useEffect(() => {
    const editId = searchParams.get('editEvent')
    if (eventFromUrl && editId && editId !== processedUrlRef.current && !isCreatingNew) {
      processedUrlRef.current = editId
      open()
    }
    if (!editId) {
      processedUrlRef.current = null
    }
  }, [eventFromUrl, searchParams, open, isCreatingNew])

  const handleOpenNewEvent = useCallback(() => {
    setIsCreatingNew(true)
    setManualEditEvent(null)
    open()
  }, [open])

  const handleOpenEditEvent = useCallback(
    (evt: IEventLocal) => {
      setIsCreatingNew(false)
      setManualEditEvent(evt)
      open()
    },
    [open]
  )

  const handleCloseModal = useCallback(() => {
    setIsCreatingNew(false)
    setManualEditEvent(null)
    close()
  }, [close])

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
    manualEditEvent: currentEvent,
    handleOpenNewEvent,
    handleOpenEditEvent,
    handleCreateEvent,
    handleUpdateEvent,
    handleCloseModal,
  }
}
