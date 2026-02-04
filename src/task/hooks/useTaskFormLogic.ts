import { useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query'
import deepEqual from 'fast-deep-equal'

import { IUser } from '@/types/IUser'
import { IEventLocal } from '@/types/IEvent'
import { ITaskForm, TASK_STATUS } from '@/types/ITask'
import { COLOR_PROGRESS } from '@/types/ui/task'

import { useFetchTaskByIdQuery } from '@/services/taskApi'

import {
  mapTaskFormToCreatePayload,
  mapTaskFormToUpdatePayload,
  taskFormFields,
  taskFormValidations,
} from '@/helpers/form-validations/getTaskFormValidations'
import { formatToDatetimeLocal } from '@/helpers/form-validations/eventHelpers'

import { useForm } from '@/hooks/useForm'

import { useCategoryActions } from '@/store/hooks/useCategoryActions'
import { useUserActions } from '@/store/hooks/useUserActions'
import { useTaskActions } from '@/store/hooks/useTaskActions'

/**
 * Custom hook that encapsulates all the business logic for TaskFormPage
 * Separates concerns and makes the component more testable
 */
export const useTaskFormLogic = () => {
  const navigate = useNavigate()
  const originalFormRef = useRef<ITaskForm | null>(null)
  // API calls
  const { id } = useParams<{ id: string }>()
  const {
    data: task,
    isFetching: loadingTask,
    error: fetchError,
    refetch,
  } = useFetchTaskByIdQuery(id ?? skipToken)

  // Actions
  const { user, fetchingProfile } = useUserActions()
  const {
    createTask,
    creating: creatingTask,
    updateTask,
    updating: updatingTask,
    createTaskError,
    updateTaskError,
  } = useTaskActions()
  const {
    // categories,
    categoriesWithTaskCount,
    fetching: fetchingCat,
    creating: creatingCat,
    createCategoryError,
    updateCategoryError,
    createCategory,
  } = useCategoryActions()

  // Form management
  const {
    events,
    participants,
    category,
    titleValid,
    categoryValid,
    formState,
    isFormValid,
    touchedFields,
    onInputChange,
    onCustomChange,
    onBlurField,
    setFormState,
    onResetForm,
  } = useForm<ITaskForm>(taskFormFields, taskFormValidations)

  // Computed values
  const categorySuggestions = useMemo(
    () => categoriesWithTaskCount.map(cat => cat.name),
    [categoriesWithTaskCount]
  )
  const validSelectedCategory = categoriesWithTaskCount?.some(cat => cat.name === category)
  const currentStatus = task?.status ?? TASK_STATUS.PENDING
  const isCompleted = currentStatus === TASK_STATUS.COMPLETED
  const colorChip = useMemo(() => {
    if (currentStatus === TASK_STATUS.COMPLETED) return COLOR_PROGRESS.completed
    if (currentStatus === TASK_STATUS.PROGRESS) return COLOR_PROGRESS.progress
    return COLOR_PROGRESS.pending
  }, [currentStatus])
  const eventsValid = events.length > 0

  const formHasChanges = useMemo(() => {
    if (!originalFormRef.current) return true
    return !deepEqual(formState, originalFormRef.current)
  }, [formState])

  // Initialize form when editing
  useEffect(() => {
    if (id && task) {
      const { title, category, participants, events } = task
      onCustomChange('title', title)
      onCustomChange('category', category.name)
      onCustomChange('participants', participants)

      const loadedEvents: IEventLocal[] = events.map(evt => ({
        ...evt,
        start: formatToDatetimeLocal(evt.start),
        end: formatToDatetimeLocal(evt.end),
      }))
      onCustomChange('events', loadedEvents)

      originalFormRef.current = {
        title: task.title,
        category: task.category.name,
        participants: task.participants,
        events: loadedEvents, // saved for dirty-check
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, id])

  // Event handlers
  const handleAddEvent = (evt: IEventLocal) => {
    onCustomChange('events', [...events, { ...evt, id: evt.id || crypto.randomUUID() }])
  }

  const handleEditEvent = (updatedEvent: IEventLocal) => {
    const newEvents = events.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    onCustomChange('events', newEvents)
  }

  const handleDeleteEvent = (id: string) => {
    const newEvents = events.filter(event => event.id !== id)
    onCustomChange('events', newEvents)
  }

  // Participants handlers
  const handleAddParticipant = (user: IUser) => {
    onCustomChange('participants', [...participants, user])
  }

  const handleRemoveParticipant = (user: IUser) => {
    onCustomChange(
      'participants',
      participants.filter(p => p.id !== user.id)
    )
  }

  // Category handlers
  const handleCreateNewCategory = async (name: string) => {
    const { data: newCategory } = await createCategory({ name })
    if (newCategory) {
      onCustomChange('category', newCategory.name)
    }
  }

  const handleResetForm = () => {
    if (task && originalFormRef?.current) {
      setFormState(originalFormRef.current)
      return
    }
    onResetForm()
  }

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validSelectedCategory || !isFormValid || !formHasChanges) return

    let result = null
    if (id) {
      const payloadEdit = mapTaskFormToUpdatePayload(id, { ...formState }, categoriesWithTaskCount)
      result = await updateTask(payloadEdit)
    } else {
      const payloadSave = mapTaskFormToCreatePayload({ ...formState }, categoriesWithTaskCount)
      result = await createTask(payloadSave)
    }

    if (!result?.error) {
      const taskId = id ?? result.data.id
      navigate(`/task/${taskId}`, { replace: true })
    }
  }

  const isSubmitDisabled =
    !validSelectedCategory ||
    !formHasChanges ||
    !isFormValid ||
    !eventsValid ||
    creatingCat ||
    creatingTask ||
    updatingTask

  const isResetDisabled = creatingCat || creatingTask || updatingTask

  const errorMessage =
    createCategoryError?.message ||
    updateCategoryError?.message ||
    createTaskError?.message ||
    updateTaskError?.message

  return {
    // State
    task,
    loadingTask,
    refetch,
    currentStatus,
    isCompleted,
    colorChip,
    formHasChanges,
    errorMessage,
    // Form state
    formState,
    titleValid,
    categoryValid,
    eventsValid,
    isFormValid,
    touchedFields,
    // Computed
    categorySuggestions,
    validSelectedCategory,
    isSubmitDisabled,
    isResetDisabled,
    user,
    fetchingProfile,
    fetchingCat,
    // Form errors
    fetchError,
    createTaskError,
    updateTaskError,
    createCategoryError,
    updateCategoryError,
    // Handlers
    onInputChange,
    onCustomChange,
    onBlurField,
    // onResetForm,
    handleResetForm,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleAddParticipant,
    handleRemoveParticipant,
    handleCreateNewCategory,
    handleTaskSubmit,
  }
}
