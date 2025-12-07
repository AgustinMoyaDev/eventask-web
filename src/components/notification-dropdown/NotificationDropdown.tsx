import { NotificationDropdownProps } from '@/types/ui/dropdown'

import { useNotificationActions } from '@/store/hooks/useNotificationActions'

import { NotificationIcon } from '../icons/Icons'
import { Dropdown } from '../dropdown/Dropdown'
import { NotificationList } from './notification-list/NotificationList'

import styles from './NotificationDropdown.module.css'

/**
 * Reusable notification dropdown component
 * Displays notifications with count badge, mark as read functionality, and customizable trigger
 * @param props - NotificationDropdownProps
 * @returns JSX.Element - Notification dropdown with badge
 */
export const NotificationDropdown = ({
  maxNotifications = 5,
  showBadge = true,
  trigger,
  className = '',
  size = 'md',
}: NotificationDropdownProps) => {
  const { unreadCount, notifications, markAsRead, markAllAsRead, fetchingNotifications } =
    useNotificationActions(1, maxNotifications)

  const notificationClasses = `${styles.notificationDropdown} ${className}`
  const iconClasses = `${styles.notificationDropdown__icon} ${styles[size]}`

  // Default trigger if none provided
  const defaultTrigger = (
    <div className={styles.notificationDropdownTrigger} aria-label="Notifications">
      <NotificationIcon className={iconClasses} />
      {showBadge && unreadCount > 0 && (
        <span className={styles.notificationDropdownBadge}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </div>
  )

  /**
   * Helper to adapt markAsRead mutation to Promise<void>
   * @param id - Notification id
   * @returns Promise<void>
   */
  const handleMarkAsRead = async (id: string): Promise<void> => {
    await markAsRead(id)
  }

  /**
   * Helper to adapt markAllAsRead mutation to Promise<void>
   * @returns Promise<void>
   */
  const handleMarkAllAsRead = async (): Promise<void> => {
    await markAllAsRead()
  }

  return (
    <Dropdown className={notificationClasses} trigger={trigger || defaultTrigger}>
      <NotificationList
        unreadCount={unreadCount}
        notifications={notifications}
        markAsRead={handleMarkAsRead}
        markAllAsRead={handleMarkAllAsRead}
        fetchingNotifications={fetchingNotifications}
      />
    </Dropdown>
  )
}
