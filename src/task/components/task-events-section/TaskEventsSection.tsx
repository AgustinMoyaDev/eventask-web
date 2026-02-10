import { ITask } from '@/types/ITask'

import { Button } from '@/components/button/Button'
import { Modal } from '@/components/modal/Modal'
import { EventForm } from '@/components/event-form/EventForm'
import { EventCardList } from '@/task/components/event-card-list/EventCardList'

import { useTaskEventsSection } from './useTaskEventsSection'

import styles from './TaskEventsSection.module.css'

interface TaskEventsSectionProps {
  task: ITask
}

/**
 * Section for managing task events
 * Allows creating, editing, and deleting events associated with a task
 */
export const TaskEventsSection = ({ task }: TaskEventsSectionProps) => {
  const {
    isModalOpen,
    editingEvent,
    handleOpenNew,
    handleOpenEdit,
    handleClose,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent,
  } = useTaskEventsSection(task.id)

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Events</h3>
        <Button variant="filled" size="sm" onClick={handleOpenNew}>
          Add Event
        </Button>
      </div>

      <EventCardList
        events={task.events}
        onOpenNewEventModal={handleOpenNew}
        onOpenEditEventModal={handleOpenEdit}
        onDelete={handleDeleteEvent}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
          <EventForm
            existingEvents={task.events}
            eventToEdit={editingEvent}
            onAddEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        </Modal>
      )}
    </div>
  )
}
