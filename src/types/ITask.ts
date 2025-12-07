import type { IEvent, IEventLocal } from './IEvent'
import type { ICategory } from './ICategory'
import type { IUser } from './IUser'
import { IBase } from './IBase'

export const TASK_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
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

export interface ITask extends IBase, TaskMetadata {
  title: string
  categoryId: string
  participantsIds: string[]
  eventsIds: string[]
  createdBy: string
  category: ICategory
  creator: IUser
  participants: IUser[]
  events: IEvent[]
}

export interface ITaskForm {
  status?: TaskStatus
  title: string
  category: string
  events: IEventLocal[]
  participants: IUser[]
}

export type TaskId = ITask['id']
export type TaskTitle = Pick<ITask, 'title'>
export type Tasks = ITask[]

export interface TaskProps {
  task: ITask
}
