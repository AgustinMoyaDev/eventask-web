import { render, screen } from '@testing-library/react'

import { NOTIFICATION_TYPE } from '@/types/INotification'
import { INVITATION_STATUS } from '@/types/IInvitation'

import { ParsedError } from '@/api/helpers/getErrorMessage'

import { NotificationDropdown } from './NotificationDropdown'

vi.mock('@/services/baseApi', () => ({
  baseApi: {
    injectEndpoints: vi.fn(() => ({
      endpoints: {},
    })),
  },
}))

vi.mock('@/store/hooks/useNotificationActions')

import { useNotificationActions } from '@/store/hooks/useNotificationActions'

vi.mock('./notification-list/NotificationList', () => ({
  NotificationList: vi.fn(() => <div data-testid="notification-list" />),
}))

import { NotificationList } from './notification-list/NotificationList'

const mockUseNotificationActions = vi.mocked(useNotificationActions)

const baseNotifications = [
  {
    id: 'notif-1',
    title: 'Contact invitation',
    message: 'Joe has invited you to connect.',
    createdAt: new Date(),
    read: false,
    type: NOTIFICATION_TYPE.INVITATION,
    data: {
      invitationId: 'inv-123',
      invitationStatus: INVITATION_STATUS.PENDING,
      actionUrl: '/invitation/123',
    },
    userId: '123',
  },
  {
    id: 'notif-1',
    title: 'Contact invitation',
    message: 'Joe has invited you to connect.',
    createdAt: new Date(),
    read: false,
    type: NOTIFICATION_TYPE.INVITATION,
    data: {
      invitationId: 'inv-123',
      invitationStatus: INVITATION_STATUS.PENDING,
      actionUrl: '/invitation/123',
    },
    userId: '123',
  },
]

const parsedError = {
  message: 'An error occurred',
  fieldsValidations: { field: 'Field is required' },
} as ParsedError

const valueMockNotificationsActions = {
  unreadCount: 1,
  notifications: baseNotifications,
  markAsRead: vi.fn(),
  markAllAsRead: vi.fn(),
  fetchingNotifications: false,
  fetchingUnreadCount: false,
  markingAsRead: false,
  markingAllAsRead: false,
  markAsReadSuccess: false,
  markAllAsReadSuccess: false,
  refetchNotifications: vi.fn(),
  refetchUnreadCount: vi.fn(),
  fetchNotificationError: parsedError,
  fetchUnreadCountErrors: parsedError,
  markAsReadErrors: parsedError,
  markAllAsReadErrors: parsedError,
  total: 5,
}

describe('NotificationDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseNotificationActions.mockReturnValue(valueMockNotificationsActions)
  })

  it('should render default trigger with badge when there are unread notifications', () => {
    render(<NotificationDropdown />)
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByTestId('notification-list')).toBeInTheDocument()
  })

  it('should render badge as 99+ when unreadCount > 99', () => {
    mockUseNotificationActions.mockReturnValue({
      ...valueMockNotificationsActions,
      unreadCount: 100,
    })
    render(<NotificationDropdown />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('should not render badge when showBadge is false', () => {
    render(<NotificationDropdown showBadge={false} />)
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })

  it('should render custom trigger if provided', () => {
    render(<NotificationDropdown trigger={<button>Custom Trigger</button>} />)
    expect(screen.getByText(/custom trigger/i)).toBeInTheDocument()
  })

  it('passes correct props to NotificationList', () => {
    render(<NotificationDropdown maxNotifications={10} />)
    expect(NotificationList).toHaveBeenCalledWith(
      expect.objectContaining({
        unreadCount: 1,
        notifications: baseNotifications,
        fetchingNotifications: false,
        markAsRead: expect.any(Function),
        markAllAsRead: expect.any(Function),
      }),
      expect.anything()
    )
  })
})
