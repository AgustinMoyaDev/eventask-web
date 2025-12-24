import { IBase } from '../IBase'

export enum ViewType {
  TASKS = 'tasks',
  CATEGORIES = 'categories',
  NOTIFICATIONS = 'notifications',
  EVENTS = 'events',
  CONTACTS = 'contacts',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface ColumnConfig<T extends IBase> {
  label: string
  sortable?: boolean
  key: keyof T | string
  render?: (item: T) => React.ReactNode
}

export interface PaginationConfig {
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export interface SortConfig {
  key: string | null
  direction: SortDirection | null
}

export interface TableProps<T extends IBase> {
  columns: ColumnConfig<T>[]
  data: T[]
  getItemId: (item: T) => string
  onView?: (id: string) => void
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  sortBy?: string | null
  sortOrder?: SortDirection | null
  onSort?: (key: string) => void
  pagination?: PaginationConfig
  onPageChange?: (page: number) => void
}
