import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

import { IBase } from '@/types/IBase'
import { SortConfig, SortDirection, ViewType } from '@/types/ui/table'

import { useCategoryActions } from '@/store/hooks/useCategoryActions'
import { useTaskActions } from '@/store/hooks/useTaskActions'
import { useNotificationActions } from '@/store/hooks/useNotificationActions'

import { Table } from '@/components/table/Table'
import { Pagination } from '@/components/pagination/Pagination'

import SeeAllPageSkeleton from './SeeAllPageSkeleton'

import { VIEW_CONFIGS, ViewDetail } from './viewConfigs'
import { sortData } from './sortingData'

import styles from './SeeAllPage.module.css'

const ITEMS_PER_PAGE = 5

const SeeAllPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10)
  const type = searchParams.get('type') as ViewType

  // Read sorting from URL params
  const sortBy = searchParams.get('sortBy')
  const sortOrder = searchParams.get('sortOrder') as SortDirection | null
  const sortConfig: SortConfig = useMemo(
    () => ({
      key: sortBy,
      direction: sortOrder,
    }),
    [sortBy, sortOrder]
  )

  // Fetch data conditionally based on type
  const shouldFetchTasks = type === ViewType.TASKS
  const shouldFetchCategories = type === ViewType.CATEGORIES
  const shouldFetchNotifications = type === ViewType.NOTIFICATIONS

  const {
    tasks,
    total,
    fetching: tasksFetching,
    fetchTaskError,
    refetch: refetchTasks,
  } = useTaskActions(currentPage, ITEMS_PER_PAGE, shouldFetchTasks)

  const {
    categories,
    fetching: categoriesFetching,
    fetchCategoryError,
    refetch: refetchCategories,
  } = useCategoryActions(shouldFetchCategories)

  const { notifications, fetchingNotifications, fetchNotificationError, refetchNotifications } =
    useNotificationActions(1, 10, shouldFetchNotifications)

  // Get the appropriate refetch function based on current view type
  const handleRetry = () => {
    const refetchMap = {
      [ViewType.TASKS]: refetchTasks,
      [ViewType.CATEGORIES]: refetchCategories,
      [ViewType.NOTIFICATIONS]: refetchNotifications,
    }

    refetchMap[type]?.()
  }

  // Get configuration for the current type
  const config = VIEW_CONFIGS[type]

  // Prepare hooks data structure
  const hooks: ViewDetail = {
    tasks: {
      data: tasks,
      total,
      fetching: tasksFetching,
      error: fetchTaskError?.message,
    },
    categories: {
      data: categories,
      fetching: categoriesFetching,
      error: fetchCategoryError?.message,
    },
    notifications: {
      data: notifications,
      fetching: fetchingNotifications,
      error: fetchNotificationError?.message,
    },
  }

  // Get raw data and apply sorting
  const rawData = config.getData(hooks)
  const sortedData = sortData(rawData as IBase[], sortConfig)

  const totalPages = config.getTotal ? Math.ceil(config.getTotal(hooks) / ITEMS_PER_PAGE) : 0

  if (!type || !Object.values(ViewType).includes(type)) {
    return (
      <div role="alert" className="error-message">
        Invalid view type.
      </div>
    )
  }

  /**
   * Update sort configuration and reset to page 1
   * @param key - Column key to sort by
   */
  const handleSort = (key: string) => {
    setSearchParams(prev => {
      const currentDirection = prev.get('sortOrder') as SortDirection | null
      const isSameKey = prev.get('sortBy') === key
      const newDirection =
        isSameKey && currentDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC

      prev.set('sortBy', key)
      prev.set('sortOrder', newDirection)
      prev.set('page', '1')
      return prev
    })
  }

  /**
   * Update page query param in URL
   * @param newPage - New page number (1-indexed)
   */
  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', String(newPage))
      return prev
    })
  }

  // Get actions for current view type
  const actions = config.createActions?.(navigate)

  if (config.isLoading(hooks)) {
    return <SeeAllPageSkeleton />
  }

  if (config.hasError(hooks)) {
    const errorMessage = config.getErrorMessage?.(hooks) ?? 'Failed to load data'
    return (
      <div role="alert" className="error-message">
        <p>{errorMessage}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    )
  }

  return (
    <div className={clsx(styles.seeAllPage, 'section')}>
      <section className={styles.tableView}>
        <Table<IBase>
          data={sortedData}
          columns={config.columns}
          getItemId={item => item.id}
          onView={actions?.onView}
          onEdit={actions?.onEdit}
          onDelete={actions?.onDelete}
          sortBy={sortConfig.key}
          sortOrder={sortConfig.direction}
          onSort={handleSort}
        />
        {config.hasPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  )
}

export default SeeAllPage
