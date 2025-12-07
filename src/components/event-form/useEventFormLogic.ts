import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'

import { useForm } from '@/hooks/useForm'
import {
  eventFormFields,
  eventFormValidations,
  formatToDatetimeLocal,
  getNextStartDate,
  hasOverlap,
} from '@/helpers/form-validations/getEventFormValidations'
import { EVENT_STATUS, IEventForm, IEventLocal } from '@/types/IEvent'
import { ColorProgressType } from '@/types/ui/task'

export function useEventFormLogic(
  eventToEdit: IEventLocal | undefined,
  existingEvents: IEventLocal[],
  onAddEvent: (evt: IEventLocal) => void,
  onUpdateEvent: (evt: IEventLocal) => void
) {
  const originalFormRef = useRef<IEventForm | null>(null)
  // Initialize the form with "raw" fields (ISO or empty)
  const {
    titleValid,
    startValid,
    endValid,
    notesValid,
    isFormValid,
    touchedFields,
    formState,
    setFormState,
    onInputChange,
    onBlurField,
    onResetForm,
  } = useForm<IEventForm>(eventFormFields, eventFormValidations)
  // computed data
  const currentStatus = eventToEdit?.status ?? EVENT_STATUS.PENDING
  const isStatusCompleted = currentStatus === EVENT_STATUS.COMPLETED
  const colorChip: ColorProgressType =
    currentStatus === EVENT_STATUS.COMPLETED
      ? 'completed'
      : currentStatus === EVENT_STATUS.PROGRESS
        ? 'progress'
        : 'pending'

  // Generates formatted initial values
  useEffect(() => {
    if (eventToEdit) {
      const { start, end } = eventToEdit
      setFormState({
        ...eventToEdit,
        start: formatToDatetimeLocal(start),
        end: formatToDatetimeLocal(end),
      })

      originalFormRef.current = eventToEdit
    } else {
      const start = getNextStartDate(existingEvents)
      const end = formatToDatetimeLocal(dayjs(start).add(1, 'hour'))
      setFormState({ title: '', start, end, notes: '' })
    }
    return () => onResetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventToEdit, existingEvents])

  const [hasConflict, setHasConflict] = useState(false)
  useEffect(() => {
    setHasConflict(hasOverlap(formState.start, formState.end, existingEvents, eventToEdit?.id))
  }, [formState.start, formState.end, existingEvents, eventToEdit?.id])

  const handleResetForm = () => {
    if (eventToEdit && originalFormRef?.current) {
      setFormState(originalFormRef.current)
      return
    }
    onResetForm()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid || hasConflict) return

    const submitEvent: IEventLocal = {
      ...formState,
      id: eventToEdit?.id ?? crypto.randomUUID(),
      status: currentStatus,
    }

    if (eventToEdit) onUpdateEvent(submitEvent)
    else onAddEvent(submitEvent)

    onResetForm()
  }

  return {
    formState,
    titleValid,
    startValid,
    endValid,
    notesValid,
    touchedFields,
    isFormValid,
    hasConflict,
    // computed
    isStatusCompleted,
    currentStatus,
    colorChip,
    onInputChange,
    onBlurField,
    handleSubmit,
    handleResetForm,
  }
}
