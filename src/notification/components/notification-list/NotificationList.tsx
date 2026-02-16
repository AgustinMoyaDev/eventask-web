import { useState } from 'react'
import clsx from 'clsx'

import { Notification, NOTIFICATION_TYPE } from '@/types/entities/notification'
import { INVITATION_STATUS } from '@/types/entities/invitation'
import { NotificationDropdownView } from '@/notification/components/notification-dropdown/notification-dropdown.types'
import { NotificationListProps } from './notification-list.types'

import {
  getNotificationTypeIcon,
  formatNotificationTime,
  shouldShowDetailButton,
  getResolvedInvitationStatus,
} from './helpers/notification-list'

import { Button } from '@/components/button/Button'
import { Loader } from '@/components/loaders/loader/Loader'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { ArrowRightIcon } from '@/components/icons/Icons'
import { InvitationDetailView } from '@/notification/components/invitation-detail-view/InvitationDetailView'

import styles from './NotificationList.module.css'

export const NotificationList = ({
  unreadCount,
  notifications,
  markAsRead,
  markAllAsRead,
  fetchingNotifications,
}: NotificationListProps) => {
  const [currentView, setCurrentView] = useState<NotificationDropdownView>(
    NotificationDropdownView.LIST
  )
  const [notificationDetail, setNotificationDetail] = useState<Notification | null>(null)

  /**
   * Navigate back to notification list from detail view
   */
  const handleBackToList = () => {
    setCurrentView(NotificationDropdownView.LIST)
    setNotificationDetail(null)
  }

  /**
   * Handle notification item click - mark as read if unread
   * @param notification - Clicked notification
   * @param e - Click event
   */
  const handleNotificationClick = async (notification: Notification) => {
    const { read, id } = notification
    if (!read) await markAsRead(id)
  }

  const handleShowDetails = (notification: Notification) => {
    const { data, type } = notification

    if (!data) return
    // Navigate to invitation detail if it's an invitation
    if (
      type === NOTIFICATION_TYPE.INVITATION &&
      data.invitationStatus === INVITATION_STATUS.PENDING &&
      data.invitationId
    ) {
      setNotificationDetail(notification)
      setCurrentView(NotificationDropdownView.INVITATION_DETAIL)
    }
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  const thereAreNotifications = notifications.length > 0
  const moreThanFiveNotification = notifications.length >= 4
  const showInvitationDetailView =
    notificationDetail && currentView === NotificationDropdownView.INVITATION_DETAIL

  return (
    <div className={styles.content}>
      {currentView === NotificationDropdownView.LIST && (
        <>
          <header className={styles.header}>
            <h3 className={styles.title}>Notifications</h3>
            {unreadCount > 0 && (
              <Button
                className={styles.markAll}
                onClick={handleMarkAllAsRead}
                aria-label="Mark all notifications as read"
              >
                <small>Mark all as read</small>
              </Button>
            )}
          </header>

          <ul className={styles.list}>
            {fetchingNotifications ? (
              <div className={styles.loading}>
                <Loader text="Loading notifications..." />
              </div>
            ) : thereAreNotifications ? (
              notifications.map(notification => {
                const { id, title, message, createdAt, read, type } = notification

                const isInvitationRejected =
                  notification.data?.invitationStatus === INVITATION_STATUS.REJECTED
                const isInvitationAccepted =
                  notification.data?.invitationStatus === INVITATION_STATUS.ACCEPTED

                return (
                  <li
                    key={id}
                    className={clsx(styles.item, !read && styles.itemUnread)}
                    onClick={() => handleNotificationClick(notification)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Notification: ${title}`}
                  >
                    <span className={styles.itemIcon}>{getNotificationTypeIcon(type)}</span>

                    <div className={styles.itemContent}>
                      <span className="text-title-sm">{title}</span>
                      <small className={styles.itemMessage}>{message}</small>
                      <small className={styles.itemTime}>
                        <time>{formatNotificationTime(createdAt.toString())}</time>
                      </small>
                    </div>

                    {!read && <span className={styles.itemUnreadDot} aria-hidden="true" />}

                    {shouldShowDetailButton(notification) && (
                      <Button
                        size="sm"
                        variant="icon"
                        onClick={() => handleShowDetails(notification)}
                        aria-label="Show details"
                      >
                        <ArrowRightIcon size={20} />
                      </Button>
                    )}

                    {getResolvedInvitationStatus(notification) && (
                      <small className={styles.itemStatus}>
                        {isInvitationRejected && 'Rejected'}
                        {isInvitationAccepted && 'Accepted'}
                      </small>
                    )}
                  </li>
                )
              })
            ) : (
              <li className={styles.empty}>
                <small>There are no new notifications.</small>
              </li>
            )}
          </ul>

          {moreThanFiveNotification && (
            <footer className={styles.footer}>
              <ButtonLink
                className={styles.viewAll}
                to="/see-all?type=notifications"
                role="menuitem"
              >
                View all notifications
              </ButtonLink>
            </footer>
          )}
        </>
      )}

      {showInvitationDetailView && (
        <InvitationDetailView notification={notificationDetail} onBack={handleBackToList} />
      )}
    </div>
  )
}
