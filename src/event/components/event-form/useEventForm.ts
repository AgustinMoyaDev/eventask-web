import { useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { eventSchema, type EventSchemaType } from '@/event/components/event-form/eventSchema'
import { formatToDatetimeLocal, getNextStartDate, hasOverlap } from '@/event/helpers/event'

import { EVENT_STATUS } from '@/types/entities/event'
import { EventFormModel } from '@/types/models/event.model'
import { ColorProgressType } from '@/types/ui/task'

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
  const startValue = useWatch({ control, name: 'start' })
  const endValue = useWatch({ control, name: 'end' })

  // Computed Status logic (Preserved from original)
  const currentStatus = eventToEdit?.status ?? EVENT_STATUS.PENDING
  const isStatusCompleted = currentStatus === EVENT_STATUS.COMPLETED
  const colorChip: ColorProgressType = isStatusCompleted ? 'completed' : 'pending'

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

  // Initialize or Reset Form Data
  useEffect(() => {
    reset(getInitialValues())
  }, [getInitialValues, reset])

  const hasConflict = hasOverlap(startValue || '', endValue || '', existingEvents, eventToEdit?.id)

  const onSubmit = (data: EventSchemaType) => {
    if (hasConflict) return

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
    hasConflict,
    isStatusCompleted,
    currentStatus,
    colorChip,

    // Actions
    handleSubmit: handleSubmit(onSubmit),
    handleResetForm,
  }
}
