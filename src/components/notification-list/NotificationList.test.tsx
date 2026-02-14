import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { NotificationList } from './NotificationList'

import { Notification, NOTIFICATION_TYPE } from '@/types/entities/notification'
import { INVITATION_STATUS } from '@/types/entities/invitation'

import styles from './NotificationList.module.css'

vi.mock('@/services/baseApi', () => ({
  baseApi: {
    injectEndpoints: vi.fn(() => ({
      endpoints: {},
    })),
  },
}))

const baseNotification: Notification = {
  id: 'notif-1',
  title: 'Contact invitation',
  message: 'Joe has invited you to connect.',
  createdAt: new Date().toISOString(),
  read: false,
  type: NOTIFICATION_TYPE.INVITATION,
  data: {
    invitationId: 'inv-123',
    invitationStatus: INVITATION_STATUS.PENDING,
    actionUrl: '/invitation/123',
  },
  userId: '123',
}

const readNotification: Notification = {
  ...baseNotification,
  id: 'notif-2',
  title: 'Assigned Task',
  message: 'You have a new task.',
  read: true,
  type: NOTIFICATION_TYPE.TASK,
  data: undefined,
}

const acceptedNotification: Notification = {
  ...baseNotification,
  id: 'notif-3',
  read: true,
  data: {
    ...baseNotification.data,
    invitationStatus: INVITATION_STATUS.ACCEPTED,
    actionUrl: '/invitation/123',
  },
}

const rejectedNotification: Notification = {
  ...baseNotification,
  id: 'notif-4',
  read: true,
  data: {
    ...baseNotification.data,
    invitationStatus: INVITATION_STATUS.REJECTED,
    actionUrl: '/invitation/123',
  },
}

describe('NotificationList', () => {
  const markAsRead = vi.fn(() => Promise.resolve())
  const markAllAsRead = vi.fn(() => Promise.resolve())

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render header and mark all as read button when there are unread notifications', () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={1}
          notifications={[baseNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /mark all notifications as read/i })
    ).toBeInTheDocument()
  })

  it('should call markAllAsRead when mark all button is clicked', async () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={2}
          notifications={[baseNotification, readNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: /mark all notifications as read/i }))
    await waitFor(() => expect(markAllAsRead).toHaveBeenCalled())
  })

  it('should render loading state', () => {
    render(
      <NotificationList
        unreadCount={0}
        notifications={[]}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        fetchingNotifications={true}
      />
    )
    expect(screen.getByText(/loading notifications/i)).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render empty state when no notifications', () => {
    render(
      <NotificationList
        unreadCount={0}
        notifications={[]}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        fetchingNotifications={false}
      />
    )
    expect(screen.getByText(/no new notifications/i)).toBeInTheDocument()
  })

  it('should render notification items and unread dot', () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={1}
          notifications={[baseNotification, readNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    expect(screen.getByText(baseNotification.title)).toBeInTheDocument()
    expect(screen.getByText(readNotification.title)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /notification:/i })).toHaveLength(2)
    expect(screen.getByLabelText(`Notification: ${baseNotification.title}`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Notification: ${readNotification.title}`)).toBeInTheDocument()
    // Unread dot
    expect(
      screen
        .getByRole('button', { name: `Notification: ${baseNotification.title}` })
        .querySelector(`.${styles.itemUnreadDot}`)
    ).toBeInTheDocument()
  })

  it('should call markAsRead when clicking an unread notification', async () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={1}
          notifications={[baseNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByLabelText(`Notification: ${baseNotification.title}`))
    await waitFor(() => expect(markAsRead).toHaveBeenCalledWith(baseNotification.id))
  })

  it('should show details button for pending invitation', () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={1}
          notifications={[baseNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /show details/i })).toBeInTheDocument()
  })

  it('should show accepted/rejected status for resolved invitations', () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={0}
          notifications={[acceptedNotification, rejectedNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    expect(screen.getByText('Accepted')).toBeInTheDocument()
    expect(screen.getByText('Rejected')).toBeInTheDocument()
  })

  it('should show "View all notifications" link when there are 4 or more notifications', () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={4}
          notifications={[
            baseNotification,
            readNotification,
            acceptedNotification,
            rejectedNotification,
          ]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    expect(screen.getByRole('menuitem', { name: /view all notifications/i })).toBeInTheDocument()
  })

  vi.mock('@/services/invitationApi', () => ({
    useInviteContactMutation: () => [vi.fn(), { isLoading: false, error: null }],
    useAcceptInvitationMutation: () => [vi.fn(), { isLoading: false, error: null }],
    useRejectInvitationMutation: () => [vi.fn(), { isLoading: false, error: null }],
  }))

  it('should navigate to invitation detail view and back', async () => {
    render(
      <MemoryRouter>
        <NotificationList
          unreadCount={1}
          notifications={[baseNotification]}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          fetchingNotifications={false}
        />
      </MemoryRouter>
    )
    // Click details button
    fireEvent.click(screen.getByRole('button', { name: /show details/i }))
    expect(screen.getByText('Contact invitation')).toBeInTheDocument()
    // Click back button in detail view
    fireEvent.click(screen.getByRole('button', { name: /back to notifications/i }))
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })
})
