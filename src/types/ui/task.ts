import { TASK_STATUS, TaskStatus } from '../entities/task'

export const COLOR_PROGRESS = {
  default: 'default',
  completed: 'completed',
  progress: 'progress',
  pending: 'pending',
  info: 'info',
  error: 'error',
} as const

export type ColorProgressType = (typeof COLOR_PROGRESS)[keyof typeof COLOR_PROGRESS]

export const getColorChipTask = (status: TaskStatus): ColorProgressType =>
  status === TASK_STATUS.COMPLETED
    ? COLOR_PROGRESS.completed
    : status === TASK_STATUS.PROGRESS
      ? COLOR_PROGRESS.progress
      : COLOR_PROGRESS.pending
