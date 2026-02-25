import { useMemo } from 'react'

import {
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from '@/features/notification/services/notificationApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

export const useNotificationMutations = () => {
  const [
    markAsRead,
    { isLoading: markingAsRead, isSuccess: markAsReadSuccess, error: markAsReadError },
  ] = useMarkAsReadMutation()

  const [
    markAllAsRead,
    { isLoading: markingAllAsRead, isSuccess: markAllAsReadSuccess, error: markAllAsReadError },
  ] = useMarkAllAsReadMutation()

  const errors = useMemo(() => {
    const rawErrors = {
      markAsRead: markAsReadError,
      markAllAsRead: markAllAsReadError,
    }

    const arrayErrors = Object.entries(rawErrors)
      .filter(([_, err]) => !!err)
      .map(([key, error]) => [key, parseRTKError(error)])

    return Object.fromEntries(arrayErrors) as Record<
      keyof typeof rawErrors,
      ReturnType<typeof parseRTKError>
    >
  }, [markAsReadError, markAllAsReadError])

  return {
    markAsRead,
    markAllAsRead,
    markingAsRead,
    markAsReadSuccess,
    markingAllAsRead,
    markAllAsReadSuccess,
    errors,
  }
}
