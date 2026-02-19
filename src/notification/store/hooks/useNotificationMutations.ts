import { useMarkAllAsReadMutation, useMarkAsReadMutation } from '@/services/notificationApi'
import { parseRTKError } from '@/services/utils/parseRTKError'

export const useNotificationMutations = () => {
  const [
    markAsRead,
    { isLoading: markingAsRead, error: markAsReadRawError, isSuccess: markAsReadSuccess },
  ] = useMarkAsReadMutation()

  const [
    markAllAsRead,
    { isLoading: markingAllAsRead, error: markAllAsReadRawError, isSuccess: markAllAsReadSuccess },
  ] = useMarkAllAsReadMutation()

  const markAsReadError = parseRTKError(markAsReadRawError)
  const markAllAsReadError = parseRTKError(markAllAsReadRawError)

  return {
    // Mutations
    markAsRead,
    markAllAsRead,
    // flags
    markingAsRead,
    markAsReadSuccess,
    markingAllAsRead,
    markAllAsReadSuccess,
    // Errors
    markAsReadError,
    markAllAsReadError,
  }
}
