import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  createTaskSchema,
  CreateTaskSchemaType,
} from '@/features/task/pages/task-create-page/taskSchema'
import { useTaskMutations } from '@/features/task/store/hooks/useTaskMutations'
import { useCategoryMutations } from '@/features/category/store/hooks/useCategoryMutations'
import { useCategoriesWithTaskCount } from '@/features/category/store/hooks/useCategoriesWithTaskCount'

/**
 * Custom hook for task creation form logic
 * Handles RHF integration, category management, and navigation after creation
 */
export const useTaskCreateForm = () => {
  const navigate = useNavigate()
  const { createTask, creating, errors: taskErrors } = useTaskMutations()
  const { categoriesWithTaskCount, isFetching } = useCategoriesWithTaskCount()
  const { createCategory, isCreating, errors: categoryErrors } = useCategoryMutations()

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      category: '',
    },
  })

  const categorySuggestions = useMemo(
    () => categoriesWithTaskCount.map(cat => cat.name),
    [categoriesWithTaskCount]
  )

  const handleCreateCategory = async (name: string) => {
    const { data: newCategory } = await createCategory({ name })
    if (newCategory) {
      setValue('category', newCategory.name)
      trigger('category')
    }
  }

  const onSubmit = async (data: CreateTaskSchemaType) => {
    const categoryToUse = categoriesWithTaskCount.find(cat => cat.name === data.category)
    if (!categoryToUse) return

    const result = await createTask({
      title: data.title.trim(),
      categoryId: categoryToUse.id,
    })

    if (result?.data) {
      navigate(`/task/${result.data.id}/edit`, { replace: true, viewTransition: true })
    }
  }

  const backendError = taskErrors?.create?.message ?? categoryErrors?.create?.message
  const taskValidationError = taskErrors?.create?.fieldErrors
  const categoryValidationError = categoryErrors?.create?.fieldErrors

  return {
    // RHF
    register,
    handleSubmit: rhfHandleSubmit(onSubmit),
    control,
    errors,
    isValid,

    categorySuggestions,
    handleCreateCategory,
    isCreating: creating,
    isFetchingCategories: isFetching,
    isCreatingCategory: isCreating,
    backendError,
    taskValidationError,
    categoryValidationError,
  }
}
