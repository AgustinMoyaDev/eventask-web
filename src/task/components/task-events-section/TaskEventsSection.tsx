import { Task } from '@/types/entities/task'

import { Button } from '@/components/button/Button'
import { Modal } from '@/components/modal/Modal'
import { EventForm } from '@/event/components/event-form/EventForm'
import { EventCardList } from '@/event/components/event-card-list/EventCardList'
import { TaskEventsSectionSkeleton } from './TaskEventsSectionSkeleton'

import { useTaskEventsSection } from './useTaskEventsSection'

import styles from './TaskEventsSection.module.css'

interface TaskEventsSectionProps {
  task: Task
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

  if (!task.events) {
    return <TaskEventsSectionSkeleton />
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Events</h3>
        <Button variant="filled" size="sm" onClick={handleOpenNew}>
          Add Event
        </Button>
      </div>

      <EventCardList
        events={task.events}
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
    </section>
  )
}
