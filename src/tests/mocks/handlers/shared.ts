/**
 * Shared helper functions for MSW handlers
 */
import type { IPaginationResult } from '@/api/types/pagination'
import { EVENT_STATUS } from '@/types/IEvent'
import { ITask, TASK_STATUS, TaskStatus } from '@/types/ITask'

/**
 * Parse pagination query params from URL
 */
export function getPaginationParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') ?? '1', 10)
  const perPage = parseInt(url.searchParams.get('perPage') ?? '10', 10)
  const sortBy = url.searchParams.get('sortBy') ?? 'createdAt'
  const sortOrder = (url.searchParams.get('sortOrder') ?? 'desc') as 'asc' | 'desc'

  return { page, perPage, sortBy, sortOrder }
}

/**
 * Create paginated response structure
 */
export function createPaginatedResponse<T>(
  allItems: T[],
  page: number,
  perPage: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
): IPaginationResult<T> {
  const sortedItems = [...allItems].sort((a, b) => {
    const aValue = a[sortBy as keyof T]
    const bValue = b[sortBy as keyof T]

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const total = sortedItems.length
  const totalPages = Math.ceil(total / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const items = sortedItems.slice(startIndex, endIndex)

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}

/**
 * Recalculate task metadata based on events
 * Used when event status changes to update parent task
 */
export function recalculateTaskProgress(task: ITask): { progress: number; status: TaskStatus } {
  const completedEvents = task.events.filter(e => e.status === EVENT_STATUS.COMPLETED).length
  const totalEvents = task.events.length

  if (totalEvents === 0) {
    return { progress: 0, status: TASK_STATUS.PENDING }
  }

  const progress = Math.round((completedEvents / totalEvents) * 100)

  let status: TaskStatus
  if (progress === 100) {
    status = TASK_STATUS.COMPLETED
  } else if (progress === 0) {
    status = TASK_STATUS.PENDING
  } else {
    status = TASK_STATUS.PROGRESS
  }

  return { progress, status }
}
