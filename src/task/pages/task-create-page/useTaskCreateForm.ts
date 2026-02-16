import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { taskSchema, TaskSchemaType } from '@/task/pages/task-create-page/taskSchema'
import { useTaskMutations } from '@/task/store/useTaskMutations'
import {
  useGetCategoriesWithTaskCountQuery,
  useCreateCategoryMutation,
} from '@/services/categoryApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

/**
 * Custom hook for task creation form logic
 * Handles RHF integration, category management, and navigation after creation
 */
export const useTaskCreateForm = () => {
  const navigate = useNavigate()
  const { createTask, creating, createTaskError } = useTaskMutations()
  const { data: categoriesWithTaskCount = [], isFetching: fetchingCategories } =
    useGetCategoriesWithTaskCountQuery()
  const [createCategory, { isLoading, error: createCategoryRawError }] = useCreateCategoryMutation()
  const createCategoryError = parseRTKError(createCategoryRawError)

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
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

  const onSubmit = async (data: TaskSchemaType) => {
    const categoryToUse = categoriesWithTaskCount.find(cat => cat.name === data.category)
    if (!categoryToUse) return

    const result = await createTask({
      title: data.title.trim(),
      categoryId: categoryToUse.id,
    })

    if (result?.data) {
      navigate(`/task/${result.data.id}/edit`, { replace: true })
    }
  }

  const backendError = createTaskError?.message ?? createCategoryError?.message
  const taskValidationError = createTaskError?.fieldErrors
  const categoryValidationError = createCategoryError?.fieldErrors

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
    isFetchingCategories: fetchingCategories,
    isCreatingCategory: isLoading,
    backendError,
    taskValidationError,
    categoryValidationError,
  }
}
