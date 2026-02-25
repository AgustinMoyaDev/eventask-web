import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'

import { ErrorState } from '@/components/error-state/ErrorState'
import { EmptyState } from '@/components/empty-state/EmptyState'
import { GhostIcon } from '@/components/icons/Icons'
import { Button } from '@/components/button/Button'
import { InlineTextEdit } from '@/components/form/inline-text-edit/InlineTextEdit'

import { TaskEventsSection } from '@/features/task/components/task-events-section/TaskEventsSection'
import { TaskParticipantsSection } from '@/features/task/components/task-participants-section/TaskParticipantsSection'
import { TaskEditSkeleton } from './TaskEditSkeleton'

import { useTaskDetail } from '@/features/task/store/hooks/useTaskDetail'
import { useTaskMutations } from '@/features/task/store/hooks/useTaskMutations'

import { taskTitleSchema } from '@/features/task/pages/task-create-page/taskSchema'

import { parseRTKError } from '@/services/utils/parseRTKError'
import { Category } from '@/types/entities/category'
import { CategoryPicker } from '@/features/category/components/category-picker/CategoryPicker'

import styles from './TaskEditPage.module.css'

/**
 * Task edit page for adding events and participants to an existing task
 * Receives newly created tasks from TaskCreatePage
 */
const TaskEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { task, isLoading, isError, error } = useTaskDetail(id)
  const { updateTask, errors } = useTaskMutations()

  if (isLoading && !task) {
    return <TaskEditSkeleton />
  }

  if (error?.status === 404 && !task) {
    return (
      <EmptyState
        icon={<GhostIcon size={48} />}
        title={'Task not found'}
        description="It seems the task doesn't exist. It might have been deleted or the link is incorrect."
        action={
          <Button onClick={() => navigate('/home')} variant="outlined">
            Go to home
          </Button>
        }
      />
    )
  }

  if (isError || !task) {
    return <ErrorState />
  }

  const handleTitleSave = async (newTitle: string) => {
    if (newTitle.trim() === task.title) return
    const result = await updateTask({ id: task.id, title: newTitle })
    if ('error' in result) {
      const parsed = parseRTKError(result.error)
      throw parsed?.fieldErrors?.title ?? parsed?.message ?? 'Failed to save'
    }
  }

  const handleCategoryChange = async (newCategory: Category) => {
    await updateTask({
      id: task.id,
      categoryId: newCategory.id,
      _optimisticCategory: newCategory,
    })
  }

  return (
    <section className={clsx(styles.taskEditPage, 'section')}>
      {errors && (
        <p className={styles.taskEditFormError} role="alert" aria-live="polite">
          {errors.update?.message ?? 'An error occurred while updating the task.'}
        </p>
      )}
      <div className={styles.taskEditContainer}>
        <header className={styles.taskEditHeader}>
          <h1 className={styles.taskEditTitle}>Edit Task</h1>
          <p className={styles.taskEditSubtitle}>
            Add events and participants to complete your task
          </p>
        </header>

        <div className={styles.taskEditInfo}>
          <InlineTextEdit
            label="Task Title"
            defaultValue={task.title}
            onSave={handleTitleSave}
            schema={taskTitleSchema}
            className={styles.readableTitle}
            inputClassName={styles.editableTitle}
          />
          <div className={styles.metaData}>
            <CategoryPicker selectedCategory={task.category} onSelect={handleCategoryChange} />
          </div>
        </div>

        <TaskEventsSection task={task} />
        <TaskParticipantsSection task={task} />
      </div>
    </section>
  )
}

export default TaskEditPage
