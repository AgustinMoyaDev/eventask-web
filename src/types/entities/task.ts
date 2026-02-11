import type { Event } from './event'
import type { Base } from './base'
import type { User } from './user'
import type { Category } from './category'

import type { EventFormModel } from '../models/event.model'

export const TASK_STATUS = {
  PENDING: 'pending',
  PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]

export interface TaskMetadata {
  beginningDate: string
  completionDate: string
  duration: number // in hours
  progress: number
  status: TaskStatus
}

export interface Task extends Base, TaskMetadata {
  title: string
  categoryId: string
  participantsIds: string[]
  eventsIds: string[]
  createdBy: string
  category: Category
  creator: User
  participants: User[]
  events: Event[]
}

export interface TaskForm {
  status?: TaskStatus
  title: string
  category: string
  events: EventFormModel[]
  participants: User[]
}

export type TaskId = Task['id']
export type TaskTitle = Pick<Task, 'title'>
export type Tasks = Task[]

export interface TaskProps {
  task: Task
}
