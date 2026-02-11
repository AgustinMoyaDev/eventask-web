import { Base } from './base'

export interface Category extends Base {
  name: string
}

/**
 * Category with count of associated tasks.
 * Used for analytics and category usage statistics.
 */
export interface CategoryWithTaskCount extends Category {
  taskCount: number
}
