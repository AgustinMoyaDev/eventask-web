import { useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { EVENT_STATUS } from '@/types/entities/event'
import { EventFormModel } from '@/types/models/event.model'
import { ChipColorType } from '@/components/chip/chip.types'

import { eventSchema, type EventSchemaType } from './eventSchema'
import { formatToDatetimeLocal, getNextStartDate, hasOverlap, hasSameTitle } from './utils/event'

export function useEventForm(
  existingEvents: EventFormModel[] = [],
  eventToEdit: EventFormModel | null = null,
  onAddEvent: (evt: EventFormModel) => void,
  onUpdateEvent: (evt: EventFormModel) => void
) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      notes: '',
      // Dates will be set by the useEffect below
    },
  })

  // Watch fields for real-time conflict detection
  const title = useWatch({ control, name: 'title' })
  const startValue = useWatch({ control, name: 'start' })
  const endValue = useWatch({ control, name: 'end' })

  // Computed Status logic (Preserved from original)
  const currentStatus = eventToEdit?.status ?? EVENT_STATUS.PENDING
  const isStatusCompleted = currentStatus === EVENT_STATUS.COMPLETED
  const colorChip: ChipColorType = isStatusCompleted ? 'completed' : 'pending'

  const getInitialValues = useCallback((): EventSchemaType => {
    if (eventToEdit) {
      return {
        title: eventToEdit.title,
        notes: eventToEdit.notes,
        start: formatToDatetimeLocal(eventToEdit.start),
        end: formatToDatetimeLocal(eventToEdit.end),
      }
    }

    const start = getNextStartDate(existingEvents)
    const end = formatToDatetimeLocal(dayjs(start).add(1, 'hour'))
    return { title: '', notes: '', start, end }
  }, [eventToEdit, existingEvents])

  useEffect(() => {
    reset(getInitialValues())
  }, [getInitialValues, reset])

  const conflictMessage =
    hasOverlap(startValue, endValue, existingEvents, eventToEdit?.id) ??
    hasSameTitle(title, existingEvents, eventToEdit?.id)

  const onSubmit = (data: EventSchemaType) => {
    if (conflictMessage) return

    const submitEvent: EventFormModel = {
      ...data,
      id: eventToEdit?.id ?? crypto.randomUUID(),
      status: currentStatus,
    }

    if (eventToEdit) {
      onUpdateEvent(submitEvent)
    } else {
      onAddEvent(submitEvent)
    }
  }

  const handleResetForm = () => {
    reset(getInitialValues())
  }

  return {
    // RHF Props
    register,
    formErrors: errors,
    isFormValid: isValid,
    isDirty,

    // Custom Logic Props
    conflictMessage,
    isStatusCompleted,
    currentStatus,
    colorChip,

    // Actions
    handleSubmit: handleSubmit(onSubmit),
    handleResetForm,
  }
}
