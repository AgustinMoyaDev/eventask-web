import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import { TaskId } from '@/types/entities/task'
import { parseRTKError } from '@/services/utils/parseRTKError'
import { useFetchTaskByIdQuery } from '@/features/task/services/taskApi'

export const useTaskDetail = (id: TaskId | undefined) => {
  const {
    data: task,
    isLoading,
    isError,
    error: rawError,
    refetch,
  } = useFetchTaskByIdQuery(id ?? skipToken)

  const parsedError = useMemo(() => parseRTKError(rawError), [rawError])

  return {
    task,
    isLoading,
    isError,
    error: parsedError,
    refetch,
  }
}
