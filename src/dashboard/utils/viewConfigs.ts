import { NavigateFunction } from 'react-router-dom'

import { ColumnConfig, ViewType } from '@/types/ui/table'
import { Base } from '@/types/entities/base'
import { Event } from '@/types/entities/event'
import { User } from '@/types/entities/user'
import { Task } from '@/types/entities/task'
import { Category } from '@/types/entities/category'
import { Notification } from '@/types/entities/notification'
import {
  CATEGORY_COLUMNS,
  CONTACTS_COLUMNS,
  EVENTS_COLUMNS,
  NOTIFICATION_COLUMNS,
  TASK_COLUMNS,
} from '@/components/table/tableConfigs'

interface ViewConfig<T extends Base> {
  columns: ColumnConfig<T>[]
  hasPagination?: boolean
  getData: (detail: ViewDetail) => T[]
  getTotal?: (detail: ViewDetail) => number
  isLoading: (detail: ViewDetail) => boolean
  hasError: (detail: ViewDetail) => boolean
  getErrorMessage?: (detail: ViewDetail) => string | null
  createActions?: (navigate: NavigateFunction) => {
    onView?: (id: string) => void
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
  }
}

/**
 * Information of data structure for each view type
 */
export interface ViewDetail {
  tasks: {
    data: Task[]
    total: number
    fetching: boolean
    error: string | null
  }
  categories: {
    data: Category[]
    total: number
    fetching: boolean
    error: string | null
  }
  notifications: {
    data: Notification[]
    total: number
    fetching: boolean
    error: string | null
  }
  events: {
    data: Event[]
    total: number
    fetching: boolean
    error: string | null
  }
  contacts: {
    data: User[]
    total: number
    fetching: boolean
    error: string | null
  }
}

interface SpecificViewConfigs {
  [ViewType.TASKS]: ViewConfig<Task>
  [ViewType.CATEGORIES]: ViewConfig<Category>
  [ViewType.NOTIFICATIONS]: ViewConfig<Notification>
  [ViewType.EVENTS]: ViewConfig<Event>
  [ViewType.CONTACTS]: ViewConfig<User>
}

export const VIEW_CONFIGS: SpecificViewConfigs = {
  [ViewType.TASKS]: {
    columns: TASK_COLUMNS,
    getData: detail => detail.tasks.data,
    getTotal: detail => detail.tasks.total,
    hasPagination: true,
    isLoading: detail => detail.tasks.fetching,
    hasError: detail => !!detail.tasks.error,
    getErrorMessage: detail => detail.tasks.error ?? null,
    createActions: navigate => ({
      onView: id => navigate(`/task/${id}`),
      onEdit: id => navigate(`/task/${id}/edit`),
      // onDelete: id => console.log('Delete task', id), // TODO: Implement modal
    }),
  },
  [ViewType.CATEGORIES]: {
    columns: CATEGORY_COLUMNS,
    getData: detail => detail.categories.data,
    getTotal: detail => detail.categories.total,
    hasPagination: true,
    isLoading: detail => detail.categories.fetching,
    hasError: detail => !!detail.categories.error,
    getErrorMessage: detail => detail.categories.error,
  },
  [ViewType.NOTIFICATIONS]: {
    columns: NOTIFICATION_COLUMNS,
    getData: detail => detail.notifications.data,
    getTotal: detail => detail.notifications.total,
    hasPagination: true,
    isLoading: detail => detail.notifications.fetching,
    hasError: detail => !!detail.notifications.error,
    getErrorMessage: detail => detail.notifications.error,
  },
  [ViewType.EVENTS]: {
    columns: EVENTS_COLUMNS,
    getData: detail => detail.events.data,
    getTotal: detail => detail.events.total,
    hasPagination: true,
    isLoading: detail => detail.events.fetching,
    hasError: detail => !!detail.events.error,
    getErrorMessage: detail => detail.events.error,
  },
  [ViewType.CONTACTS]: {
    columns: CONTACTS_COLUMNS,
    getData: detail => detail.contacts.data,
    getTotal: detail => detail.contacts.total,
    hasPagination: true,
    isLoading: detail => detail.contacts.fetching,
    hasError: detail => !!detail.contacts.error,
    getErrorMessage: detail => detail.contacts.error,
  },
}
