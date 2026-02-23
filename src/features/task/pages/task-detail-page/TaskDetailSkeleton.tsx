import { TaskInfoSkeleton } from '@/features/task/components/task-info/TaskInfoSkeleton'
import { DatePillsSkeleton } from '@/features/event/components/date-pills-list/DatePillsSkeleton'
import { ScheduleSkeleton } from '@/features/event/components/schedule/ScheduleSkeleton'

export const TaskDetailSkeleton = () => {
  return (
    <>
      <TaskInfoSkeleton />
      <DatePillsSkeleton />
      <ScheduleSkeleton />
    </>
  )
}
