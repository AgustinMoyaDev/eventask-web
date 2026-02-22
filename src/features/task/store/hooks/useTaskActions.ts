import { useCallback } from 'react'

import { useAppDispatch } from '@/store/reduxStore'
import { setActiveTaskId } from '@/task/store/slice/taskSlice'

export const useTaskActions = () => {
  const dispatch = useAppDispatch()

  const setActiveTask = useCallback(
    (id: string | undefined) => {
      dispatch(setActiveTaskId(id))
    },
    [dispatch]
  )

  const clearActiveTask = useCallback(() => {
    dispatch(setActiveTaskId(undefined))
  }, [dispatch])

  return {
    setActiveTask,
    clearActiveTask,
  }
}
