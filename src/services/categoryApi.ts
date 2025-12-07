import { baseApi } from './baseApi'

import { ICategory } from '../types/ICategory'
import { ICategoryCreatePayload, ICategoryUpdatePayload } from '../types/dtos/category'
import { IPaginationOptions, IPaginationResult } from '../api/types/pagination'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchCategories: builder.query<IPaginationResult<ICategory>, IPaginationOptions | void>({
      query: ({ page = 0, perPage = 5 } = {}) => ({
        url: '/categories',
        method: 'GET',
        params: { page, perPage },
      }),
      providesTags: (result = { items: [], total: 0 }) => [
        { type: 'Category', id: 'LIST' },
        ...result.items.map(c => ({ type: 'Category' as const, id: c.id })),
      ],
    }),
    createCategory: builder.mutation<ICategory, ICategoryCreatePayload>({
      query: newCategory => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<ICategory, ICategoryUpdatePayload>({
      query: updatedCategory => ({
        url: `/categories/${updatedCategory.id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Category', id: arg.id }],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: categoryId => ({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
