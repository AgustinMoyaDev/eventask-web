import { NavigateFunction } from 'react-router-dom'

import { ColumnConfig, ViewType } from '@/types/ui/table'
import { IBase } from '@/types/IBase'
import { IEvent } from '@/types/IEvent'
import { IUser } from '@/types/IUser'
import { ITask } from '@/types/ITask'
import { ICategory } from '@/types/ICategory'
import { INotification } from '@/types/INotification'
import {
  CATEGORY_COLUMNS,
  CONTACTS_COLUMNS,
  EVENTS_COLUMNS,
  NOTIFICATION_COLUMNS,
  TASK_COLUMNS,
} from '@/components/table/tableConfigs'

interface ViewConfig<T extends IBase> {
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
    data: ITask[]
    total: number
    fetching: boolean
    error: string | null
  }
  categories: {
    data: ICategory[]
    total: number
    fetching: boolean
    error: string | null
  }
  notifications: {
    data: INotification[]
    total: number
    fetching: boolean
    error: string | null
  }
  events: {
    data: IEvent[]
    total: number
    fetching: boolean
    error: string | null
  }
  contacts: {
    data: IUser[]
    total: number
    fetching: boolean
    error: string | null
  }
}

interface SpecificViewConfigs {
  [ViewType.TASKS]: ViewConfig<ITask>
  [ViewType.CATEGORIES]: ViewConfig<ICategory>
  [ViewType.NOTIFICATIONS]: ViewConfig<INotification>
  [ViewType.EVENTS]: ViewConfig<IEvent>
  [ViewType.CONTACTS]: ViewConfig<IUser>
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
