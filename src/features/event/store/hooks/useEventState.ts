import { useAppSelector } from '@/store/reduxStore'
import { selectActiveEvent, selectActiveEventId } from '../selectors/event'

/**
 * Event sync read state (selectors)
 */
export const useEventState = () => {
  const activeEvent = useAppSelector(selectActiveEvent)
  const activeEventId = useAppSelector(selectActiveEventId)

  return {
    activeEvent,
    activeEventId,
  }
}
