import { z } from 'zod'

export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, 'Title is required.')
  .max(100, 'Title is too long.')

export const taskCategorySchema = z
  .string()
  .trim()
  .min(1, 'You must select a category.')
  .max(75, 'Category name is too long.')

export const createTaskSchema = z.object({
  title: taskTitleSchema,
  category: taskCategorySchema,
})

export const updateTaskSchema = z.object({
  title: taskTitleSchema.optional(),
  category: taskCategorySchema.optional(), // Aquí podría ser categoryId si el backend lo prefiere
})

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>
export type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>
