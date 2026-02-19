import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import dayjs from 'dayjs'

import { USER_DRAG_TYPES } from '@/user/constants/user-drag.constants'
import { TASK_DRAG_CONSTANTS } from '@/task/constants/task-drag.constants'

import { Task } from '@/types/entities/task'
import { EVENT_STATUS } from '@/types/entities/event'

import { PROGRESS_STATUS } from './helpers/getColorChip'

import { useTaskMutations } from '@/task/store/hooks/useTaskMutations'
import { useModalState } from '@/components/modal/store/useModalState'
import { useModalActions } from '@/components/modal/store/useModalActions'

import { UserAvatarList } from '@/user/components/user-avatar-list/UserAvatarList'
import { ModalIds } from '@/components/modal/modal.types'
import { ArrowRightIcon, CalendarIcon, DeleteIcon, EditIcon } from '@/components/icons/Icons'
import { Button } from '@/components/button/Button'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { Chip } from '@/components/chip/Chip'
import { Clock } from '@/components/clock/Clock'
import { ConfirmModal } from '@/components/confirm-modal/ConfirmModal'
import { LinearProgress } from '@/components/linear-progress/LinearProgress'

import styles from './TaskInfo.module.css'

interface TaskInfoProps {
  task: Task
}

export const TaskInfo = ({ task }: TaskInfoProps) => {
  const navigate = useNavigate()
  const { isOpen } = useModalState(ModalIds.Confirm)
  const { open, close } = useModalActions(ModalIds.Confirm)
  const { deleting, deleteTask } = useTaskMutations()
  const {
    id,
    title,
    status,
    category,
    events = [],
    participants = [],
    beginningDate,
    completionDate,
    progress,
    duration,
  } = task

  const totalEvents = events?.length ?? 0
  const completeEvents = events?.filter(e => e.status === EVENT_STATUS.COMPLETED).length ?? 0
  const eventProgresTask = `${completeEvents}/${totalEvents}`
  const chipConfig = PROGRESS_STATUS[status]

  const handleConfirmDelete = async () => {
    const result = await deleteTask(id)
    if (!result?.error) {
      close()
      navigate('/home', { replace: true })
    }
  }

  return (
    <section className={clsx(styles.taskInfo, 'section')}>
      <div className={styles.taskInfoHeader}>
        <div className={styles.taskInfoTitleBlock}>
          <h2 className="text-title-lg">{title}</h2>
          <div className={styles.taskInfoMeta}>
            <Chip label={category?.name ?? 'Uncategorized'} variant="outlined" role="category" />
            <Chip label={chipConfig.label} color={chipConfig.color} />

            <span className={styles.taskInfoDates}>
              {dayjs(beginningDate).format('DD MMM')}
              <ArrowRightIcon className={styles.taskInfoDateSeparator} />
              {dayjs(completionDate).format('DD MMM')}
            </span>

            <span>Duration: {`${duration} h`}</span>

            <div className={styles.taskInfoProgressGroup}>
              <LinearProgress showLabel value={progress} />
              <small className={styles.taskInfoEventCount}>({eventProgresTask}) events done.</small>
            </div>
          </div>
        </div>

        <Clock />
      </div>

      <div className={styles.taskInfoParticipants}>
        {participants.length > 0 ? (
          <>
            <span className={styles.taskInfoParticipantsLabel}>Participants:</span>

            <UserAvatarList
              collapsed={false}
              users={participants}
              draggable={{
                type: USER_DRAG_TYPES.PARTICIPANT,
                originId: id,
                originName: TASK_DRAG_CONSTANTS.ORIGIN,
              }}
            />
          </>
        ) : (
          <small>There are no participants assigned to this task yet.</small>
        )}
      </div>

      <div className={styles.taskInfoActions}>
        <ButtonLink className={styles.actionBtn} variant="tonal" to="/calendar">
          <CalendarIcon />
          <span className={styles.taskInfoText}>Calendar</span>
        </ButtonLink>

        <ButtonLink className={styles.actionBtn} variant="filled" to={`/task/${id}/edit`}>
          <EditIcon />
          <span className={styles.taskInfoText}>Edit task</span>
        </ButtonLink>

        <Button
          className={styles.actionBtn}
          variant="outlined"
          onClick={() => open()}
          disabled={deleting}
        >
          <DeleteIcon />
          <span className={styles.taskInfoText}>Delete task</span>
        </Button>
      </div>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => close()}
        />
      )}
    </section>
  )
}
