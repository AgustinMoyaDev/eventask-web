import { render, screen } from '@testing-library/react'

import { NOTIFICATION_TYPE } from '@/types/entities/notification'
import { INVITATION_STATUS } from '@/types/entities/invitation'

import { ParsedRTKError } from '@/services/utils/parseRTKError'

import { NotificationDropdown } from './NotificationDropdown'

vi.mock('@/services/baseApi', () => ({
  baseApi: {
    injectEndpoints: vi.fn(() => ({
      endpoints: {},
    })),
  },
}))

vi.mock('@/notification/store/useNotificationMutations')
vi.mock('@/notification/store/useNotificationQueries')

import { useNotificationMutations } from '@/notification/store/useNotificationMutations'
import { useNotificationQueries } from '@/notification/store/useNotificationQueries'

vi.mock('@/notification/components/notification-list/NotificationList', () => ({
  NotificationList: vi.fn(() => <div data-testid="notification-list" />),
}))

const mockUseNotificationQueries = vi.mocked(useNotificationQueries)
const mockUseNotificationMutations = vi.mocked(useNotificationMutations)

const baseNotifications = [
  {
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
  },
  {
    id: 'notif-2',
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
  },
]

const parsedError = {
  message: 'An error occurred',
  fieldErrors: { field: 'Field is required' },
} as ParsedRTKError

const valueMockNotificationsMutations = {
  markAsRead: vi.fn(),
  markAllAsRead: vi.fn(),
  unreadCount: 1,
  notifications: baseNotifications,
  markingAsRead: false,
  markingAllAsRead: false,
  markAsReadSuccess: false,
  markAllAsReadSuccess: false,
  markAsReadError: parsedError,
  markAllAsReadError: parsedError,
}

const valueMockNotificationsQueries = {
  refetchNotifications: vi.fn(),
  refetchUnreadCount: vi.fn(),
  notifications: baseNotifications,
  total: 5,
  unreadCount: 1,
  fetchingNotifications: false,
  fetchingUnreadCount: false,
  fetchNotificationsError: parsedError,
  fetchUnreadCountError: parsedError,
}

describe('NotificationDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseNotificationQueries.mockReturnValue(valueMockNotificationsQueries)
    mockUseNotificationMutations.mockReturnValue(valueMockNotificationsMutations)
  })

  it('should render default trigger with badge when there are unread notifications', () => {
    render(<NotificationDropdown />)
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByTestId('notification-list')).toBeInTheDocument()
  })

  it('should render badge as 99+ when unreadCount > 99', () => {
    mockUseNotificationQueries.mockReturnValue({
      ...valueMockNotificationsQueries,
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

  it('should display notifications when dropdown is opened', () => {
    render(<NotificationDropdown maxNotifications={10} />)
    expect(screen.getByTestId('notification-list')).toBeInTheDocument()
  })
})
