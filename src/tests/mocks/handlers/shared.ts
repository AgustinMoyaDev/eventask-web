/**
 * Shared helper functions for MSW handlers
 */
import type { IPaginationResult } from '@/api/types/pagination'

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
  perPage: number
): IPaginationResult<T> {
  const total = allItems.length
  const totalPages = Math.ceil(total / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const items = allItems.slice(startIndex, endIndex)

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
