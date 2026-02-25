import { useMemo } from 'react'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/features/category/services/categoryApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

/**
 * Category Mutations Hook
 *
 * Provides category write operations (create, update, delete).
 * Includes loading states and error handling.
 *
 * @example
 * ```tsx
 * const { createCategory, isCreating, createCategoryError } = useCategoryMutations()
 *
 * const handleCreate = async (name: string) => {
 *   const { data } = await createCategory({ name })
 *   if (data) console.log('Created:', data)
 * }
 * ```
 */
export const useCategoryMutations = () => {
  const [createCategory, { isLoading: isCreating, error: createError }] =
    useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating, error: updateError }] =
    useUpdateCategoryMutation()
  const [deleteCategory, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCategoryMutation()

  const errors = useMemo(() => {
    const rawErrors = {
      create: createError,
      update: updateError,
      delete: deleteError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [createError, updateError, deleteError])

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isUpdating,
    isDeleting,
    errors,
  }
}
