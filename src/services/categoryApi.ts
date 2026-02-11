import { baseApi } from './baseApi'

import { Category, CategoryWithTaskCount } from '../types/entities/category'
import { CategoryCreatePayload, CategoryUpdatePayload } from '../types/dtos/category'
import { PaginationOptions, PaginationResult } from '../types/dtos/api/pagination'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchCategories: builder.query<PaginationResult<Category>, PaginationOptions | void>({
      query: ({ page = 1, perPage = 5 } = {}) => ({
        url: '/categories',
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: result => [
        { type: 'Category', id: 'LIST' },
        ...(result?.items.map(c => ({ type: 'Category' as const, id: c.id })) ?? []),
      ],
    }),
    getCategoriesWithTaskCount: builder.query<CategoryWithTaskCount[], void>({
      query: () => ({
        url: '/categories/task-count',
        method: 'GET',
      }),
      providesTags: result => [
        { type: 'Category', id: 'LIST-COUNT' },
        ...(result?.map(c => ({ type: 'Category' as const, id: c.id })) ?? []),
      ],
    }),
    createCategory: builder.mutation<Category, CategoryCreatePayload>({
      query: newCategory => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST-COUNT' }],
    }),
    updateCategory: builder.mutation<Category, CategoryUpdatePayload>({
      query: updatedCategory => ({
        url: `/categories/${updatedCategory.id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Category', id: 'LIST' },
        { type: 'Category', id: arg.id },
      ],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: categoryId => ({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchCategoriesQuery,
  useGetCategoriesWithTaskCountQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
