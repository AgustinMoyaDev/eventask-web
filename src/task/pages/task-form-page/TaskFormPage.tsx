import clsx from 'clsx'

import { Button } from '@/components/button/Button'
import { Chip } from '@/components/chip/Chip'
import { EventForm } from '@/components/event-form/EventForm'
import { Input } from '@/components/input/Input'
import { InputWithSuggestions } from '@/components/input-with-suggestions/InputWithSuggestions'
import { Modal } from '@/components/modal/Modal'
import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'

import { EventCardList } from '@/task/components/event-card-list/EventCardList'

import { useTaskFormLogic } from '@/task/hooks/useTaskFormLogic'
import { useTaskFormEventModal } from '@/task/hooks/useTaskFormEventModal'

import { IUser } from '@/types/IUser'

import { TaskFormSkeleton } from './TaskFormSkeleton'

import styles from './TaskFormPage.module.css'

const TaskFormPage = () => {
  const {
    // State
    task,
    loadingTask,
    refetch,
    currentStatus,
    isCompleted,
    colorChip,
    errorMessage,
    // Form state
    formState: { title, category, participants, events },
    titleValid,
    categoryValid,
    eventsValid,
    touchedFields,
    // Computed
    categorySuggestions,
    isSubmitDisabled,
    isResetDisabled,
    fetchingProfile,
    user,
    fetchingCat,
    // Form errors
    fetchError,
    createTaskError,
    updateTaskError,
    createCategoryError,
    // Handlers
    onInputChange,
    onBlurField,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleAddParticipant,
    handleRemoveParticipant,
    handleCreateNewCategory,
    handleTaskSubmit,
    handleResetForm,
  } = useTaskFormLogic()

  const {
    isOpen,
    editingEvent,
    handleOpenNewEvent,
    handleOpenEditEvent,
    handleCreateEvent,
    handleUpdateEvent,
    handleCloseModal,
  } = useTaskFormEventModal({
    events,
    handleAddModalEvent: handleAddEvent,
    handleEditModalEvent: handleEditEvent,
  })

  if (fetchError) {
    return (
      <div>
        <p>Error loading task.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  const isLoading = task?.id && loadingTask

  return isLoading ? (
    <TaskFormSkeleton />
  ) : (
    <section className={clsx(styles.taskFormPage, 'section')}>
      <form className={styles.taskForm} onSubmit={handleTaskSubmit}>
        <p className={styles.taskFormBackendError}>{errorMessage}</p>
        <header className={styles.taskFormHeader}>
          <h1 className={clsx('text-title-lg', styles.taskFormTitle)}>
            {task?.id ? 'Edit ' : 'Create '} task
          </h1>
          <Chip label={currentStatus!} color={colorChip} />
        </header>
        <fieldset
          disabled={isCompleted}
          className={clsx(styles.taskFormFieldset, isCompleted && styles.taskFormFieldsetReadonly)}
        >
          <Input
            type="text"
            name="title"
            label="Title"
            required
            placeholder=""
            value={title}
            error={
              titleValid ??
              createTaskError?.fieldsValidations?.title ??
              updateTaskError?.fieldsValidations?.title
            }
            touched={touchedFields.title}
            onChange={onInputChange}
            onBlur={() => onBlurField('title')}
          />

          <InputWithSuggestions
            name="category"
            label="Category"
            value={category}
            hint="Develop, UX, UI."
            error={
              categoryValid ??
              createCategoryError?.fieldsValidations?.name ??
              updateTaskError?.fieldsValidations?.name
            }
            touched={touchedFields.category}
            allowCreateIfNotExists
            suggestionData={categorySuggestions}
            onCreateNew={handleCreateNewCategory}
            loading={fetchingCat}
            onChange={onInputChange}
            onBlur={() => onBlurField('category')}
          />

          <MultiSelectInput<IUser>
            label="Participants"
            typeOption="email"
            options={user?.contacts ?? []}
            loading={fetchingProfile}
            selectedOptions={participants}
            onAddItem={handleAddParticipant}
            onRemoveItem={handleRemoveParticipant}
            getOptionLabel={(user: IUser) => user.email}
            getOptionKey={(user: IUser) => user.id}
          />

          <EventCardList
            events={events}
            onOpenNewEventModal={handleOpenNewEvent}
            onOpenEditEventModal={handleOpenEditEvent}
            onDelete={handleDeleteEvent}
            eventsValid={eventsValid}
          />

          <footer className={styles.taskFormFooter}>
            <Button type="submit" variant="filled" disabled={isSubmitDisabled}>
              {task?.id ? 'Edit task' : 'Create task'}
            </Button>

            <Button
              type="reset"
              variant="outlined"
              onClick={handleResetForm}
              disabled={isResetDisabled}
            >
              Reset form
            </Button>
          </footer>
        </fieldset>
      </form>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <EventForm
            existingEvents={events}
            eventToEdit={editingEvent}
            onAddEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        </Modal>
      )}
    </section>
  )
}

export default TaskFormPage
