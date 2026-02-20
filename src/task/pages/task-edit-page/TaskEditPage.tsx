import { useParams, Navigate } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query'
import clsx from 'clsx'

import { useFetchTaskByIdQuery } from '@/services/taskApi'

import { Chip } from '@/components/chip/Chip'
import { TaskEventsSection } from '@/task/components/task-events-section/TaskEventsSection'
import { TaskParticipantsSection } from '@/task/components/task-participants-section/TaskParticipantsSection'

import { TaskEditSkeleton } from './TaskEditSkeleton'

import styles from './TaskEditPage.module.css'

/**
 * Task edit page for adding events and participants to an existing task
 * Receives newly created tasks from TaskCreatePage
 */
const TaskEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: task, isLoading, isError } = useFetchTaskByIdQuery(id ?? skipToken)

  if (isError) {
    return <Navigate to="/not-found" replace />
  }

  if (isLoading || !task) {
    return <TaskEditSkeleton />
  }

  return (
    <section className={clsx(styles.taskEditPage, 'section')}>
      <div className={styles.taskEditContainer}>
        <header className={styles.taskEditHeader}>
          <h1 className={styles.taskEditTitle}>Edit Task</h1>
          <p className={styles.taskEditSubtitle}>
            Add events and participants to complete your task
          </p>
        </header>

        {/* Task Info (read-only for now) */}
        <div className={styles.taskEditInfo}>
          <h2>{task.title}</h2>
          <p>
            <Chip label={task.category?.name ?? 'Uncategorized'} variant="outlined" />
          </p>
        </div>

        <TaskEventsSection task={task} />

        <TaskParticipantsSection task={task} />
      </div>
    </section>
  )
}

export default TaskEditPage
