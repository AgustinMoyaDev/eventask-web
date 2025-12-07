import { TaskInfoSkeleton } from '@/task/components/task-info/TaskInfoSkeleton'
import { DatePillsSkeleton } from '@/task/components/date-pills-list/DatePillsSkeleton'
import { ScheduleSkeleton } from '@/task/components/schedule/ScheduleSkeleton'

export const TaskDetailSkeleton = () => {
  return (
    <>
      <TaskInfoSkeleton />
      <DatePillsSkeleton />
      <ScheduleSkeleton />
    </>
  )
}
