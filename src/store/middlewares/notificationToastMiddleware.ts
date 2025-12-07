import { notificationApi } from '@/services/notificationApi'

import { registerToastFor } from './toastHelper'

const { getUserNotifications, markAsRead, markAllAsRead } = notificationApi.endpoints

const fetchNotificationsOperation = {
  endpoints: {
    matchPending: getUserNotifications.matchPending,
    matchFulfilled: getUserNotifications.matchFulfilled,
    matchRejected: getUserNotifications.matchRejected,
  },
  messages: {
    loading: 'Loading notifications…',
    success: 'Notifications loaded',
    error: 'Error loading notifications',
  },
}

const markAsReadOperation = {
  endpoints: {
    matchPending: markAsRead.matchPending,
    matchFulfilled: markAsRead.matchFulfilled,
    matchRejected: markAsRead.matchRejected,
  },
  messages: {
    loading: 'Marking as read…',
    success: 'Notification marked as read',
    error: 'Error marking notification as read',
  },
}

const markAllAsReadOperation = {
  endpoints: {
    matchPending: markAllAsRead.matchPending,
    matchFulfilled: markAllAsRead.matchFulfilled,
    matchRejected: markAllAsRead.matchRejected,
  },
  messages: {
    loading: 'Marking all as read…',
    success: 'All notifications marked as read',
    error: 'Error marking all notifications as read',
  },
}

const toastNotificationOperations = [
  fetchNotificationsOperation,
  markAsReadOperation,
  markAllAsReadOperation,
]

toastNotificationOperations.forEach(({ endpoints, messages }) =>
  registerToastFor({ endpoints, messages })
)
