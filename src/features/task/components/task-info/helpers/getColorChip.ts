import { ChipColorType, CHIP_COLOR } from '@/components/chip/chip.types'
import { TASK_STATUS, TaskStatus } from '@/types/entities/task'

export const PROGRESS_STATUS: Record<TaskStatus, { label: string; color: ChipColorType }> = {
  [TASK_STATUS.PENDING]: { label: 'Pending', color: CHIP_COLOR.pending },
  [TASK_STATUS.PROGRESS]: { label: 'In Progress', color: CHIP_COLOR.progress },
  [TASK_STATUS.COMPLETED]: { label: 'Completed', color: CHIP_COLOR.completed },
}
