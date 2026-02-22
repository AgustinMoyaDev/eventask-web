import clsx from 'clsx'

import { Input } from '@/components/input/Input'
import { Textarea } from '@/components/text-area/Textarea'
import { Button } from '@/components/button/Button'
import { Chip } from '@/components/chip/Chip'

import { EventFormProps } from './event.types'

import { useEventForm } from './useEventForm'

import styles from './EventForm.module.css'

export const EventForm = ({
  existingEvents = [],
  eventToEdit = null,
  onAddEvent,
  onUpdateEvent,
}: EventFormProps) => {
  const {
    // RHF
    register,
    formErrors,
    isFormValid,
    // Custom logic props
    hasConflict,
    isStatusCompleted,
    colorChip,
    currentStatus,
    // Actions
    handleSubmit,
    handleResetForm,
  } = useEventForm(existingEvents, eventToEdit, onAddEvent, onUpdateEvent)

  return (
    <form className={styles.eventForm} onSubmit={handleSubmit} aria-label="Event form">
      <header className={styles.eventFormHeader}>
        <h1 className="text-title-lg">{eventToEdit ? 'Edit ' : 'Create '} event</h1>
        <Chip label={currentStatus} color={colorChip} />
      </header>

      {hasConflict && (
        <small className={styles.eventFormError}>
          Another event is already occupying that time slot. Adjust the start or end time.
        </small>
      )}

      <fieldset
        disabled={isStatusCompleted}
        className={clsx(
          styles.eventFormFieldset,
          isStatusCompleted && styles.eventFormFieldsetReadonly
        )}
      >
        <Input
          type="text"
          label="Title"
          required
          autoComplete="off"
          {...register('title')}
          error={formErrors.title?.message}
        />

        <Input
          type="datetime-local"
          label="Start date"
          required
          step="900"
          autoComplete="off"
          {...register('start', { deps: ['end'] })}
          error={formErrors.start?.message}
        />

        <Input
          type="datetime-local"
          label="End date"
          required
          step="900"
          autoComplete="off"
          {...register('end')}
          error={formErrors.end?.message}
        />

        <Textarea
          id="notes"
          label="Notes"
          required
          {...register('notes')}
          error={formErrors.notes?.message}
        />

        <footer className={styles.eventFormFooter}>
          <Button type="submit" variant="filled" disabled={!isFormValid || hasConflict}>
            {eventToEdit ? 'Edit' : 'Create'} event
          </Button>
          <Button variant="outlined" onClick={handleResetForm}>
            Reset event
          </Button>
        </footer>
      </fieldset>
    </form>
  )
}
