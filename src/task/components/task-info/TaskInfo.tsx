import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'

import dayjs from 'dayjs'

import { ArrowRightIcon, CalendarIcon, DeleteIcon, EditIcon } from '@/components/icons/Icons'
import { Button } from '@/components/button/Button'
import { ConfirmModal } from '@/components/confirm-modal/ConfirmModal'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { Chip } from '@/components/chip/Chip'
import { UsersAvatars } from '@/components/users-avatars/UsersAvatars'
import { LinearProgress } from '@/components/linear-progress/LinearProgress'

import { ModalIds } from '@/types/ui/modal'

import { ITask } from '@/types/ITask'
import { EVENT_STATUS } from '@/types/entities/event'
import { DRAGGABLE_ITEM_SRC, ORIGIN_NAME } from '@/types/ui/dragNdrop'
import { getColorChipTask } from '@/types/ui/task'

import { useTaskActions } from '@/store/hooks/useTaskActions'
import { useModalActions } from '@/store/hooks/useModalActions'

import { Clock } from '../clock/Clock'

import styles from './TaskInfo.module.css'

interface Props {
  task: ITask
}

export const TaskInfo = ({ task }: Props) => {
  const navigate = useNavigate()
  const { isOpen, open, close } = useModalActions(ModalIds.Confirm)
  const { deleting, deleteTask } = useTaskActions()
  const {
    id,
    title,
    status,
    category,
    events,
    participants,
    beginningDate,
    completionDate,
    progress,
    duration,
  } = task

  const totalEvents = events?.length ?? 0
  const completeEvents = events?.filter(e => e.status === EVENT_STATUS.COMPLETED).length ?? 0
  const eventProgresTask = `${completeEvents}/${totalEvents}`

  const colorChip = getColorChipTask(status)

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
            <Chip label={category?.name} variant="outlined" role="category" />
            <Chip label={status} color={colorChip} />

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

            <UsersAvatars
              collapsed={false}
              users={participants}
              draggable={{
                id: '', // populate with participant ID
                type: DRAGGABLE_ITEM_SRC.PARTICIPANT,
                originId: id,
                originName: ORIGIN_NAME.TASK,
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
