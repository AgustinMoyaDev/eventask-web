import clsx from 'clsx'

import { IEventLocal } from '@/types/IEvent'

import { Input } from '../input/Input'
import { Textarea } from '../text-area/Textarea'
import { Button } from '../button/Button'
import { Chip } from '../chip/Chip'

import { useEventFormLogic } from './useEventFormLogic'

import styles from './EventForm.module.css'

interface Props {
  eventToEdit?: IEventLocal
  existingEvents?: IEventLocal[]
  onAddEvent: (event: IEventLocal) => void
  onUpdateEvent: (event: IEventLocal) => void
}

export const EventForm = ({
  eventToEdit,
  existingEvents = [],
  onAddEvent,
  onUpdateEvent,
}: Props) => {
  const {
    formState: { title, start, end, notes },
    titleValid,
    startValid,
    endValid,
    notesValid,
    touchedFields,
    isFormValid,
    hasConflict,
    isStatusCompleted,
    colorChip,
    currentStatus,
    onInputChange,
    onBlurField,
    handleSubmit,
    handleResetForm,
  } = useEventFormLogic(eventToEdit, existingEvents, onAddEvent, onUpdateEvent)

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
          name="title"
          label="Title"
          required
          value={title}
          autoComplete="off"
          error={titleValid}
          touched={touchedFields.title}
          onChange={onInputChange}
          onBlur={() => onBlurField('title')}
        />

        <Input
          type="datetime-local"
          name="start"
          label="Start date"
          required
          min={start}
          value={start}
          step="900"
          autoComplete="off"
          error={startValid}
          touched={touchedFields.start}
          onChange={onInputChange}
          onBlur={() => onBlurField('start')}
        />

        <Input
          type="datetime-local"
          name="end"
          label="End date"
          required
          min={start}
          value={end}
          step="900"
          autoComplete="off"
          error={endValid}
          touched={touchedFields.end}
          onChange={onInputChange}
          onBlur={() => onBlurField('end')}
        />

        <Textarea
          id="notes"
          name="notes"
          label="Notes"
          required
          value={notes || ''}
          onChange={onInputChange}
          error={notesValid}
          touched={touchedFields.notes}
          onBlur={() => onBlurField('notes')}
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
