import { useMemo } from 'react'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/services/categoryApi'
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

  const createCategoryError = useMemo(() => parseRTKError(createError), [createError])
  const updateCategoryError = useMemo(() => parseRTKError(updateError), [updateError])
  const deleteCategoryError = useMemo(() => parseRTKError(deleteError), [deleteError])

  return {
    // Mutations
    createCategory,
    updateCategory,
    deleteCategory,

    // Loading flags
    isCreating,
    isUpdating,
    isDeleting,

    // Errors
    createCategoryError,
    updateCategoryError,
    deleteCategoryError,
  }
}
