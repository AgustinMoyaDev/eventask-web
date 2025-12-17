import { ColumnConfig } from '@/types/ui/table'
import { ITask } from '@/types/ITask'
import { ICategory } from '@/types/ICategory'
import { INotification } from '@/types/INotification'

import { getColorChipTask } from '@/types/ui/task'

import { Chip } from '@/components/chip/Chip'

export const TASK_COLUMNS: ColumnConfig<ITask>[] = [
  { key: 'title', label: 'Title', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: task => <Chip label={task.status} color={getColorChipTask(task.status)} />,
  },
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    render: task => new Date(task.createdAt).toLocaleDateString(),
  },
]

export const CATEGORY_COLUMNS: ColumnConfig<ICategory>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
]

export const NOTIFICATION_COLUMNS: ColumnConfig<INotification>[] = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'message', label: 'Message', sortable: true },
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    render: notification => new Date(notification.createdAt).toLocaleDateString(),
  },
]
