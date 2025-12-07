import { IBase } from './IBase'

export interface ICategory extends IBase {
  name: string
}

export interface ICountingCategories extends ICategory {
  quantity: number
}
