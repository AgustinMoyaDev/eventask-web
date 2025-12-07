import { PaginationProps } from '@/types/ui/pagination'

import { Button } from '../button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/Icons'

import styles from './Pagination.module.css'

/**
 * Pagination component for navigating through data pages
 * @param currentPage - Current active page (1-indexed)
 * @param totalPages - Total number of pages
 * @param onPageChange - Callback when page changes
 * @param maxVisiblePages - Max page buttons to show (default: 5)
 * @returns JSX.Element - Accessible pagination component
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  /**
   * Calculate visible page numbers based on current page
   * Example: [1, 2, 3, 4, 5] or [... 5, 6, 7 ...]
   */
  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const halfVisible = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, currentPage + halfVisible)

    // Adjust if at edges
    if (currentPage <= halfVisible) {
      end = maxVisiblePages
    }
    if (currentPage >= totalPages - halfVisible) {
      start = totalPages - maxVisiblePages + 1
    }

    const pages: (number | string)[] = []

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination navigation">
      <Button
        className={styles.paginationBtn}
        variant="icon"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ArrowLeftIcon />
      </Button>

      <div className={styles.paginationPages}>
        {getVisiblePages().map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={page}
              variant={currentPage === page ? 'fab' : 'icon'}
              size="sm"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className={styles.paginationEllipsis}
              aria-hidden="true"
            >
              {page}
            </span>
          )
        )}
      </div>

      <Button
        size="sm"
        variant="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ArrowRightIcon />
      </Button>
    </nav>
  )
}
