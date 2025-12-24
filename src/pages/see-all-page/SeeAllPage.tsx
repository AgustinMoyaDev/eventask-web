import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

import { IBase } from '@/types/IBase'
import { ColumnConfig, SortConfig, SortDirection, ViewType } from '@/types/ui/table'

import { useCategoryActions } from '@/store/hooks/useCategoryActions'
import { useTaskActions } from '@/store/hooks/useTaskActions'
import { useNotificationActions } from '@/store/hooks/useNotificationActions'
import { useEventActions } from '@/store/hooks/useEventActions'
import { useUserActions } from '@/store/hooks/useUserActions'

import { Button } from '@/components/button/Button'
import { Table } from '@/components/table/Table'
import { Pagination } from '@/components/pagination/Pagination'

import SeeAllPageSkeleton from './SeeAllPageSkeleton'

import { VIEW_CONFIGS, ViewDetail } from './viewConfigs'
import { sortData } from './sortingData'

import styles from './SeeAllPage.module.css'

const DEFAULT_ITEMS_PER_PAGE = 5
const MIN_ITEMS_PER_PAGE = 5
const MAX_ITEMS_PER_PAGE = 50

const SeeAllPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isRetrying, setIsRetrying] = useState(false)

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10)
  const validatedPage = Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage

  const rawItemsPerPage = parseInt(
    searchParams.get('perPage') ?? String(DEFAULT_ITEMS_PER_PAGE),
    10
  )
  const itemsPerPage = Number.isNaN(rawItemsPerPage)
    ? DEFAULT_ITEMS_PER_PAGE
    : Math.min(Math.max(rawItemsPerPage, MIN_ITEMS_PER_PAGE), MAX_ITEMS_PER_PAGE)

  const type = searchParams.get('type') as ViewType

  const sortBy = searchParams.get('sortBy')
  const sortOrder = searchParams.get('sortOrder') as SortDirection | null
  const sortConfig: SortConfig = useMemo(
    () => ({
      key: sortBy,
      direction: sortOrder,
    }),
    [sortBy, sortOrder]
  )

  const shouldFetchCategories = type === ViewType.CATEGORIES
  const shouldFetchContacts = type === ViewType.CONTACTS
  const shouldFetchEvents = type === ViewType.EVENTS
  const shouldFetchNotifications = type === ViewType.NOTIFICATIONS
  const shouldFetchTasks = type === ViewType.TASKS

  const {
    categories,
    total: totalCategories,
    fetching: categoriesFetching,
    fetchCategoryError,
    refetch: refetchCategories,
  } = useCategoryActions(
    validatedPage,
    itemsPerPage,
    shouldFetchCategories,
    shouldFetchCategories ? sortConfig : undefined
  )
  const {
    contacts,
    total: totalContacts,
    fetching: contactsFetching,
    fetchContactsError,
    refetchContacts,
  } = useUserActions(
    validatedPage,
    itemsPerPage,
    shouldFetchContacts,
    shouldFetchContacts ? sortConfig : undefined
  )
  const {
    events,
    total: totalEvents,
    fetching: eventsFetching,
    fetchAllEventsError,
    refetch: refetchEvents,
  } = useEventActions(
    validatedPage,
    itemsPerPage,
    shouldFetchEvents,
    shouldFetchEvents ? sortConfig : undefined
  )
  const {
    notifications,
    total: totalNotifications,
    fetchingNotifications,
    fetchNotificationError,
    refetchNotifications,
  } = useNotificationActions(
    validatedPage,
    itemsPerPage,
    shouldFetchNotifications,
    shouldFetchNotifications ? sortConfig : undefined
  )
  const {
    tasks,
    total,
    fetching: tasksFetching,
    fetchTaskError,
    refetch: refetchTasks,
  } = useTaskActions(
    validatedPage,
    itemsPerPage,
    shouldFetchTasks,
    shouldFetchTasks ? sortConfig : undefined
  )

  const handleRetry = async () => {
    setIsRetrying(true)
    const refetchMap = {
      [ViewType.TASKS]: refetchTasks,
      [ViewType.CATEGORIES]: refetchCategories,
      [ViewType.NOTIFICATIONS]: refetchNotifications,
      [ViewType.EVENTS]: refetchEvents,
      [ViewType.CONTACTS]: refetchContacts,
    }

    await refetchMap[type]?.()
    setIsRetrying(false)
  }

  const config = VIEW_CONFIGS[type]

  // Guard: If type is invalid or config missing, show error early
  if (!config || !type || !Object.values(ViewType).includes(type)) {
    return (
      <div className={clsx(styles.seeAllPage, 'section')}>
        <div className={`text-body-lg ${styles.errorState}`} role="alert">
          <p className={styles.errorStateMessage}>Invalid view type.</p>
        </div>
      </div>
    )
  }

  const hooks: ViewDetail = {
    tasks: {
      data: tasks,
      total,
      fetching: tasksFetching,
      error: fetchTaskError?.message,
    },
    categories: {
      data: categories,
      total: totalCategories,
      fetching: categoriesFetching,
      error: fetchCategoryError?.message,
    },
    notifications: {
      data: notifications,
      total: totalNotifications,
      fetching: fetchingNotifications,
      error: fetchNotificationError?.message,
    },
    events: {
      data: events,
      total: totalEvents,
      fetching: eventsFetching,
      error: fetchAllEventsError?.message,
    },
    contacts: {
      data: contacts,
      total: totalContacts,
      fetching: contactsFetching,
      error: fetchContactsError?.message,
    },
  }

  const rawData = config.getData(hooks)
  // Apply sorting based on pagination type:
  // - With pagination: backend already sorted (server-side)
  // - Without pagination: sort in client (client-side)
  const sortedData = config.hasPagination
    ? rawData // Already sorted by backend
    : sortData(rawData as IBase[], sortConfig) // Sort locally

  const totalPages = config.getTotal ? Math.ceil(config.getTotal(hooks) / itemsPerPage) : 0

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
      <div className={clsx(styles.seeAllPage, 'section')}>
        <div className={`text-body-lg ${styles.errorState}`} role="alert">
          <p className={styles.errorStateMessage}>{errorMessage}</p>
          <Button onClick={handleRetry} disabled={isRetrying}>
            {isRetrying ? 'Retrying...' : 'Retry'}
          </Button>
        </div>
      </div>
    )
  }

  if (sortedData.length === 0) {
    return (
      <div className={clsx(styles.seeAllPage, 'section')}>
        <div className={`text-body-lg ${styles.emptyState}`} role="status">
          <p className={styles.emptyStateMessage}>
            No {type} found. {config.hasPagination && 'Try adjusting your filters.'}
          </p>
          <Button onClick={() => navigate('/home')}>Go back Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(styles.seeAllPage, 'section')}>
      <section className={styles.tableView}>
        <Table<IBase>
          data={sortedData}
          columns={config.columns as ColumnConfig<IBase>[]}
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
            currentPage={validatedPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  )
}

export default SeeAllPage
