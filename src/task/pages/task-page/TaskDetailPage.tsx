import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { skipToken } from '@reduxjs/toolkit/query'

import dayjs from 'dayjs'

import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { DragProviders } from '@/context/drag/DragProviders'

import { TaskId } from '@/types/ITask'
import {
  DRAGGABLE_ITEM_SRC,
  DROPPABLE_ITEM_TARGET,
  DroppableData,
  ParticipantDragData,
} from '@/types/ui/dragNdrop'

import { DragOverlayContent } from '@/components/drag-n-drop/drag-overlay/DragOverlayContent'

import { TaskInfo } from '@/task/components/task-info/TaskInfo'
import { DatePills } from '@/task/components/date-pills-list/DatePills'
import { Schedule } from '@/task/components/schedule/Schedule'

import { getEventsSegments } from '@/utils/computedEvents'
import { useEventActions } from '@/store/hooks/useEventActions'

import { useFetchTaskByIdQuery } from '@/services/taskApi'

import { TaskDetailSkeleton } from './TaskDetailSkeleton'

const TaskDetailPage = () => {
  const { id } = useParams<{ id: TaskId }>()
  const { data: task, isLoading, isError, refetch } = useFetchTaskByIdQuery(id ?? skipToken)
  const { assignCollaborator, removeCollaborator } = useEventActions()

  const [selectedDate, setSelectedDate] = useState(dayjs())
  const isToday = selectedDate.isSame(dayjs(), 'day')
  const [draggedData, setDraggedData] = useState<ParticipantDragData | undefined>(undefined)

  const [allSegments, segmentsForDay] = useMemo(() => {
    const allSegments = getEventsSegments(task?.events)
    const segmentsForDay = allSegments.filter(({ start }) =>
      dayjs(start).isSame(selectedDate, 'day')
    )
    return [allSegments, segmentsForDay]
  }, [selectedDate, task?.events])

  const handleDragStart = (e: DragStartEvent) => {
    if (!e.active) return
    const data = e.active.data?.current as ParticipantDragData
    if (data) {
      setDraggedData(data)
    }
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    setDraggedData(undefined)
    const { active, over } = e

    if (!over || !active) return
    const src = active.data?.current as ParticipantDragData
    const target = over.data?.current as DroppableData

    if (!src || !target) return

    // Assign collaborator (drag participant to event)
    if (
      src.type === DRAGGABLE_ITEM_SRC.PARTICIPANT &&
      target.type === DROPPABLE_ITEM_TARGET.EVENT
    ) {
      const collaboratorId = src.id.toString()
      const eventId = target.id.toString()
      const eventExists = allSegments.find(es => es.id === eventId)!
      const collaboratorExists = eventExists?.collaborators?.some(c => c.id === collaboratorId)
      if (collaboratorExists) return
      await assignCollaborator({ eventId, collaboratorId })
    }

    // Remove collaborator (drag collaborator to trash)
    if (
      src.type === DRAGGABLE_ITEM_SRC.COLLABORATOR &&
      target.type === DROPPABLE_ITEM_TARGET.TRASH
    ) {
      const collaboratorId = src.id.toString()
      const eventId = src.originId?.toString()

      if (eventId) await removeCollaborator({ eventId, collaboratorId })
      return
    }
  }

  if (isError) {
    return (
      <div>
        <p>Error loading task.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  return isLoading || !task ? (
    <TaskDetailSkeleton />
  ) : (
    <DragProviders
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      overlay={draggedData ? <DragOverlayContent data={draggedData} /> : null}
    >
      <TaskInfo task={task} />
      <DatePills
        eventSegments={allSegments}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Schedule
        isToday={isToday}
        segmentsForDay={segmentsForDay}
        onRequestNextDay={() => setSelectedDate(selectedDate.add(1, 'day'))}
      />
    </DragProviders>
  )
}

export default TaskDetailPage
