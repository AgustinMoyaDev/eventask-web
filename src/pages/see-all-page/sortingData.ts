import { IBase } from '@/types/IBase'
import { SortConfig, SortDirection } from '@/types/ui/table'

/**
 * Generic sorting function for any data type
 * Handles numbers, dates, and strings with appropriate comparators
 * @template T - Type of items to sort
 * @param data - Array of items to sort
 * @param sortConfig - Sort configuration (key and direction)
 * @returns Sorted array (new reference, does not mutate original)
 */
export function sortData<T extends IBase>(data: T[], sortConfig: SortConfig): T[] {
  if (!sortConfig.key || !sortConfig.direction) return data

  const direction = sortConfig.direction === SortDirection.ASC ? 1 : -1

  return Array.from(data).sort((a, b) => {
    const valueA = a[sortConfig.key as keyof T]
    const valueB = b[sortConfig.key as keyof T]

    // Handle null/undefined values (always sort to end)
    if (valueA == null && valueB == null) return 0
    if (valueA == null) return 1
    if (valueB == null) return -1

    // Number comparison
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return (valueA - valueB) * direction
    }

    // Date comparison
    if (valueA instanceof Date && valueB instanceof Date) {
      return (valueA.getTime() - valueB.getTime()) * direction
    }

    // String comparison (fallback for any other type)
    return (
      String(valueA).localeCompare(String(valueB), undefined, {
        numeric: true, // "file10" after "file2"
        sensitivity: 'base', // Ignore accents/capital letters
      }) * direction
    )
  })
}
