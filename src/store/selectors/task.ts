import { tasksAdapter } from '../slices/task/taskSlice'
import { RootState } from '../store'

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors<RootState>(state => state.task)
