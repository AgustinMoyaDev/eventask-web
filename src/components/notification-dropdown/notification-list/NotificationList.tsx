import { useState } from 'react'

import clsx from 'clsx'

import { Button } from '@/components/button/Button'
import { Loader } from '@/components/loaders/loader/Loader'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { InvitationDetailView } from '../invitation-detail-view/InvitationDetailView'
import { ArrowRightIcon } from '@/components/icons/Icons'

import { DropdownView } from '@/types/ui/dropdown'
import { INotification, NOTIFICATION_TYPE } from '@/types/INotification'
import { INVITATION_STATUS } from '@/types/IInvitation'

import styles from './NotificationList.module.css'

interface NotificationListProps {
  unreadCount: number
  notifications: INotification[]
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  fetchingNotifications: boolean
}

export const NotificationList = ({
  unreadCount,
  notifications,
  markAsRead,
  markAllAsRead,
  fetchingNotifications,
}: NotificationListProps) => {
  const [currentView, setCurrentView] = useState<DropdownView>(DropdownView.LIST)
  const [notificationDetail, setNotificationDetail] = useState<INotification | null>(null)

  /**
   * Navigate back to notification list from detail view
   */
  const handleBackToList = () => {
    setCurrentView(DropdownView.LIST)
    setNotificationDetail(null)
  }

  /**
   * Handle notification item click - mark as read if unread
   * @param notification - Clicked notification
   * @param e - Click event
   */
  const handleNotificationClick = async (notification: INotification) => {
    const { read, id } = notification
    if (!read) await markAsRead(id)
  }

  const handleShowDetails = (notification: INotification) => {
    const { data, type } = notification

    if (!data) return
    // Navigate to invitation detail if it's an invitation
    if (
      type === NOTIFICATION_TYPE.INVITATION &&
      data.invitationStatus === INVITATION_STATUS.PENDING &&
      data.invitationId
    ) {
      setNotificationDetail(notification)
      setCurrentView(DropdownView.INVITATION_DETAIL)
    }
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  /**
   * Get notification type icon based on notification type
   * @param type - Notification type
   * @returns Icon component or null
   */
  const getNotificationTypeIcon = (type: NOTIFICATION_TYPE) => {
    switch (type) {
      case NOTIFICATION_TYPE.TASK:
        return '📝'
      case NOTIFICATION_TYPE.EVENT:
        return '📅'
      case NOTIFICATION_TYPE.INVITATION:
        return '👥'
      case NOTIFICATION_TYPE.SYSTEM:
        return '📋'
      default:
        return '🔔'
    }
  }

  /**
   * Format notification timestamp for display
   * @param createdAt - Notification creation timestamp
   * @returns Formatted time string
   */
  const formatNotificationTime = (createdAt: string) => {
    const date = new Date(createdAt)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  const showDetailButton = (notification: INotification) =>
    notification && notification.data?.invitationStatus === INVITATION_STATUS.PENDING

  const showResolvedNotification = (notification: INotification) => {
    if (
      !notification ||
      !notification.data ||
      !notification.data.actionUrl ||
      notification.data.invitationStatus === INVITATION_STATUS.PENDING
    )
      return false
    const { invitationStatus } = notification.data

    return invitationStatus === INVITATION_STATUS.REJECTED
      ? INVITATION_STATUS.REJECTED
      : INVITATION_STATUS.ACCEPTED
  }

  return (
    <div className={styles.notificationDropdownContent}>
      {currentView === DropdownView.LIST && (
        <>
          <header className={styles.notificationDropdownHeader}>
            <h3 className="text-title-sm">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                className={styles.notificationDropdownMarkAll}
                onClick={handleMarkAllAsRead}
                aria-label="Mark all notifications as read"
              >
                <small>Mark all as read</small>
              </Button>
            )}
          </header>

          <ul className={styles.notificationDropdownList}>
            {fetchingNotifications ? (
              <div className={styles.notificationDropdownLoading}>
                <Loader />
                &nbsp; Loading notifications...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification: INotification) => {
                const { id, title, message, createdAt, read, type } = notification

                const isInvitationRejected =
                  notification.data?.invitationStatus === INVITATION_STATUS.REJECTED
                const isInvitationAccepted =
                  notification.data?.invitationStatus === INVITATION_STATUS.ACCEPTED

                return (
                  <li
                    key={id}
                    className={clsx(
                      styles.notificationDropdownItem,
                      !read && styles.notificationDropdownItemUnread
                    )}
                    onClick={() => handleNotificationClick(notification)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Notification: ${title}`}
                  >
                    <span className={styles.notificationDropdownItemIcon}>
                      {getNotificationTypeIcon(type)}
                    </span>

                    <div className={styles.notificationDropdownItemContent}>
                      <span className="text-title-sm">{title}</span>
                      <small className={styles.notificationDropdownItemMessage}>{message}</small>
                      <small className={styles.notificationDropdownItemTime}>
                        <time>{formatNotificationTime(createdAt.toString())}</time>
                      </small>
                    </div>

                    {!read && (
                      <span
                        className={styles.notificationDropdownItemUnreadDot}
                        aria-hidden="true"
                      />
                    )}

                    {showDetailButton(notification) && (
                      <Button
                        size="sm"
                        variant="icon"
                        onClick={() => handleShowDetails(notification)}
                        aria-label="Show details"
                      >
                        <ArrowRightIcon size={20} />
                      </Button>
                    )}

                    {showResolvedNotification(notification) && (
                      <small className={styles.notificationDropdownItemStatus}>
                        {isInvitationRejected && 'Rejected'}
                        {isInvitationAccepted && 'Accepted'}
                      </small>
                    )}
                  </li>
                )
              })
            ) : (
              <li className={styles.notificationDropdownEmpty}>
                <small>There are no new notifications.</small>
              </li>
            )}

            {notifications.length >= 2 && (
              <footer className={styles.notificationDropdownFooter}>
                <ButtonLink
                  className={styles.notificationDropdownViewAll}
                  to="/see-all?type=notifications"
                >
                  View all notifications
                </ButtonLink>
              </footer>
            )}
          </ul>
        </>
      )}

      {notificationDetail && currentView === DropdownView.INVITATION_DETAIL && (
        <InvitationDetailView notification={notificationDetail} onBack={handleBackToList} />
      )}
    </div>
  )
}
