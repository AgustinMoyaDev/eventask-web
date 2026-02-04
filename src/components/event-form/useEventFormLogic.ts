import { useCallback, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { eventSchema, type EventSchemaType } from '@/helpers/form-validations/eventSchema'
import {
  formatToDatetimeLocal,
  getNextStartDate,
  hasOverlap,
} from '@/helpers/form-validations/eventHelpers'
import { EVENT_STATUS, IEventLocal } from '@/types/IEvent'
import { ColorProgressType } from '@/types/ui/task'

export function useEventFormLogic(
  onAddEvent: (evt: IEventLocal) => void,
  onUpdateEvent: (evt: IEventLocal) => void,
  existingEvents: IEventLocal[] = [],
  eventToEdit?: IEventLocal
) {
  // 1. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      notes: '',
      // Dates will be set by the useEffect below
    },
  })

  // 2. Watch fields for real-time conflict detection
  const startValue = useWatch({ control, name: 'start' })
  const endValue = useWatch({ control, name: 'end' })

  // 3. Computed Status logic (Preserved from original)
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

  // 4. Initialize or Reset Form Data
  useEffect(() => {
    reset(getInitialValues())
  }, [getInitialValues, reset])

  // 5. Conflict Logic using watched values
  const hasConflict = hasOverlap(startValue || '', endValue || '', existingEvents, eventToEdit?.id)

  // 6. Form Submission
  const onSubmit = (data: EventSchemaType) => {
    if (hasConflict) return

    const submitEvent: IEventLocal = {
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
