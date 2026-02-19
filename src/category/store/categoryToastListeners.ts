import { categoryApi } from '@/services/categoryApi'
import { registerToastFor } from '@/components/toast/store/toastHelper'

export function registerCategoryToastListeners() {
  const { fetchCategories, createCategory } = categoryApi.endpoints

  const listCategoryOperation = {
    endpoints: {
      matchPending: fetchCategories.matchPending,
      matchFulfilled: fetchCategories.matchFulfilled,
      matchRejected: fetchCategories.matchRejected,
    },
    messages: {
      loading: 'Loading categories…',
      success: 'Categories loaded',
      error: 'Error loading categories',
    },
  }

  const createCategoryOperation = {
    endpoints: {
      matchPending: createCategory.matchPending,
      matchFulfilled: createCategory.matchFulfilled,
      matchRejected: createCategory.matchRejected,
    },
    messages: {
      loading: 'Creating category…',
      success: 'Category created',
      error: 'Error creating category',
    },
  }

  const toastCategoryOperations = [listCategoryOperation, createCategoryOperation]

  toastCategoryOperations.forEach(({ endpoints, messages }) =>
    registerToastFor({ endpoints, messages })
  )
}
