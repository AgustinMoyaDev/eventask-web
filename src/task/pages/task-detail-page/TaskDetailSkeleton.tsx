import { TaskInfoSkeleton } from '@/task/components/task-info/TaskInfoSkeleton'
import { DatePillsSkeleton } from '@/event/components/date-pills-list/DatePillsSkeleton'
import { ScheduleSkeleton } from '@/event/components/schedule/ScheduleSkeleton'

export const TaskDetailSkeleton = () => {
  return (
    <>
      <TaskInfoSkeleton />
      <DatePillsSkeleton />
      <ScheduleSkeleton />
    </>
  )
}
