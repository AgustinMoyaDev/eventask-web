import { useMemo } from 'react'
import clsx from 'clsx'

import { useSearch } from '@/context/search/SearchContext'
import { useTaskQueries } from '@/task/store/hooks/useTaskQueries'

import { PlusIcon } from '@/components/icons/Icons'
import { ScrollableContainer } from '@/components/scrollable-container/ScrollableContainer'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { OngoingTask } from '../ongoing-task/OngoingTask'
import { OngoingTaskSkeleton } from '../ongoing-task/OngoingTaskSkeleton'

import styles from './OngoingTaskList.module.css'

export const OngoingTaskList = () => {
  const { search } = useSearch()
  const { fetching, tasks } = useTaskQueries()

  const filteredTasks = useMemo(() => {
    return tasks.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
  }, [tasks, search])

  const tasksList = useMemo(() => {
    return filteredTasks.map(task => <OngoingTask key={task.id} task={task} />)
  }, [filteredTasks])

  const thereAreOngoingTasks = tasksList.length > 0

  return (
    <section className={clsx(styles.ongoingTasks, 'section')}>
      <header className={styles.ongoingTasksHeader}>
        <div className={styles.ongoingTasksHeaderInfo}>
          <h2 className="text-title-lg">Ongoing Tasks</h2>
          <ButtonLink
            variant="icon"
            size="sm"
            className={styles.ongoingTasksBtnNew}
            to="/task/new"
            aria-label="Create new task"
          >
            <PlusIcon />
          </ButtonLink>
        </div>
        <ButtonLink variant="text" to="/see-all?type=tasks" disabled>
          See all
        </ButtonLink>
      </header>

      <ScrollableContainer
        className={styles.ongoingTasksList}
        isEmpty={!thereAreOngoingTasks && !fetching}
      >
        {fetching ? (
          Array.from({ length: 3 }).map((_, index) => (
            <OngoingTaskSkeleton key={`skeleton-${index}`} />
          ))
        ) : thereAreOngoingTasks ? (
          tasksList
        ) : (
          <li>No tasks found. Create a new one or clear the search input...</li>
        )}
      </ScrollableContainer>
    </section>
  )
}
