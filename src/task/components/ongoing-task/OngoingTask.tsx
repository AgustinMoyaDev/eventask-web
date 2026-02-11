import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { CalendarIcon } from '@/components/icons/Icons'
import { CircularProgress } from '@/components/circular-progress/CircularProgress'
import { UsersAvatars } from '@/components/users-avatars/UsersAvatars'

import { OngoingTaskProps } from './task.types'

import styles from './OngoingTask.module.css'

export const OngoingTask = ({ task }: OngoingTaskProps) => {
  const { id, title, duration, beginningDate, completionDate, progress, participants = [] } = task

  const formattedBeginningDate = dayjs(beginningDate).format('DD MMM')
  const formattedCompletionDate = dayjs(completionDate).format('DD MMM')
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/task/${id}`)
  }

  return (
    <li className={styles.ongoingTask} key={id} onClick={handleClick}>
      <header className={styles.ongoingTaskHeader}>
        <h3 className={`text-title-md line-clamp-2 ${styles.ongoingTaskTitle}`} title={title}>
          {title}
        </h3>
        <CircularProgress progress={progress} />
      </header>
      {participants.length > 0 && (
        <section className={styles.ongoingTaskBody}>
          <small className={styles.ongoingTaskCollaborators}>Collaborators</small>
          <UsersAvatars users={participants} />
        </section>
      )}
      <footer className={styles.ongoingTaskFooter}>
        <small className={styles.ongoingTaskSchedule}>
          <CalendarIcon className={styles.ongoingTaskCalendarIcon} size={20} />
          {`${formattedBeginningDate} - ${formattedCompletionDate}`}
        </small>
        <small className={styles.ongoingTaskDuration}>{`${duration} h`}</small>
      </footer>
    </li>
  )
}
