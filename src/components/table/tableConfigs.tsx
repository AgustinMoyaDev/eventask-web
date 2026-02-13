import { Task } from '@/types/entities/task'
import { Category } from '@/types/entities/category'
import { Notification } from '@/types/entities/notification'
import { Event } from '@/types/entities/event'
import { User } from '@/types/entities/user'

import { ColumnConfig } from './table.types'

import { Chip } from '@/components/chip/Chip'
import { Avatar } from '@/components/users-avatars/Avatar'
import { PROGRESS_STATUS } from '@/task/components/task-info/helpers/getColorChip'

export const TASK_COLUMNS: ColumnConfig<Task>[] = [
  { key: 'title', label: 'Title', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: task => <Chip label={task.status} color={PROGRESS_STATUS[task.status].color} />,
  },
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    render: task => new Date(task.createdAt).toLocaleDateString(),
  },
]

export const CATEGORY_COLUMNS: ColumnConfig<Category>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
]

export const NOTIFICATION_COLUMNS: ColumnConfig<Notification>[] = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'message', label: 'Message', sortable: true },
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    render: notification => new Date(notification.createdAt).toLocaleDateString(),
  },
]

export const EVENTS_COLUMNS: ColumnConfig<Event>[] = [
  { key: 'title', label: 'Title', sortable: true },
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    render: event => new Date(event.createdAt).toLocaleDateString(),
  },
  {
    key: 'start',
    label: 'Start',
    sortable: true,
    render: event => new Date(event.start).toLocaleDateString(),
  },
  {
    key: 'end',
    label: 'End',
    sortable: true,
    render: event => new Date(event.end).toLocaleDateString(),
  },
]

export const CONTACTS_COLUMNS: ColumnConfig<User>[] = [
  { key: 'firstName', label: 'First name', sortable: true },
  { key: 'lastName', label: 'Last name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'profileImageURL',
    label: 'Profile Image',
    sortable: false,
    render: user => <Avatar user={user} />,
  },
]
