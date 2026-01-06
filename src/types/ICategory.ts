import { IBase } from './IBase'

export interface ICategory extends IBase {
  name: string
}

/**
 * Category with count of associated tasks.
 * Used for analytics and category usage statistics.
 */
export interface ICategoryWithTaskCount extends ICategory {
  taskCount: number
}
