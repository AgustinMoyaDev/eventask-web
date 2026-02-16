import { useCallback } from 'react'

import { useAppDispatch } from '@/store/reduxStore'
import { resetActiveEventId, setActiveEventId } from '@/event/store/slice/eventSlice'

/**
 * Event sync actions (slice reducers via dispatch)
 */
export const useEventActions = () => {
  const dispatch = useAppDispatch()

  const setActiveEvent = useCallback(
    (id: string) => {
      dispatch(setActiveEventId(id))
    },
    [dispatch]
  )

  const clearActiveEvent = useCallback(() => {
    dispatch(resetActiveEventId())
  }, [dispatch])

  return {
    setActiveEvent,
    clearActiveEvent,
  }
}
