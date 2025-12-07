import { NavigateFunction } from 'react-router-dom'

import { ColumnConfig, ViewType } from '@/types/ui/table'
import { ITask } from '@/types/ITask'
import { ICategory } from '@/types/ICategory'
import { INotification } from '@/types/INotification'
import {
  CATEGORY_COLUMNS,
  NOTIFICATION_COLUMNS,
  TASK_COLUMNS,
} from '@/components/table/tableConfigs'
import { IBase } from '@/types/IBase'

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
    fetching: boolean
    error: string | null
  }
  notifications: {
    data: INotification[]
    fetching: boolean
    error: string | null
  }
}

type SpecificViewConfigs = {
  [ViewType.TASKS]: ViewConfig<ITask>
  [ViewType.CATEGORIES]: ViewConfig<ICategory>
  [ViewType.NOTIFICATIONS]: ViewConfig<INotification>
}

export const VIEW_CONFIGS: SpecificViewConfigs = {
  [ViewType.TASKS]: {
    columns: TASK_COLUMNS,
    getData: detail => detail.tasks.data,
    getTotal: detail => detail.tasks.total,
    hasPagination: true,
    isLoading: detail => detail.tasks.fetching,
    hasError: detail => !!detail.tasks.error,
    getErrorMessage: detail => detail.tasks.error || null,
    createActions: navigate => ({
      onView: id => navigate(`/task/${id}`),
      onEdit: id => navigate(`/task-form/${id}`),
      onDelete: id => console.log('Delete task', id), // TODO: Implement modal
    }),
  },

  [ViewType.CATEGORIES]: {
    columns: CATEGORY_COLUMNS,
    getData: detail => detail.categories.data,
    hasPagination: false,
    isLoading: detail => detail.categories.fetching,
    hasError: detail => !!detail.categories.error,
    getErrorMessage: detail => detail.categories.error || null,
  },

  [ViewType.NOTIFICATIONS]: {
    columns: NOTIFICATION_COLUMNS,
    getData: detail => detail.notifications.data,
    hasPagination: false,
    isLoading: detail => detail.notifications.fetching,
    hasError: detail => !!detail.notifications.error,
    getErrorMessage: detail => detail.notifications.error || null,
  },
}
