import { z } from 'zod'

/**
 * Zod schema for task creation (basic fields)
 * Used in TaskCreatePage and TaskEditPage
 */
export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  category: z.string().trim().min(1, 'You must select a category.').max(75, 'Title is too long.'),
})

export type TaskSchemaType = z.infer<typeof taskSchema>
