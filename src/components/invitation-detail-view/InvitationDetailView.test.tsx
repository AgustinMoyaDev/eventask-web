import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { useInvitationActions } from '@/store/hooks/useInvitationActions'
import type { InvitationDetailViewProps } from '@/types/ui/dropdown'
import { Notification, NOTIFICATION_TYPE } from '@/types/entities/notification'
import { ParsedError } from '@/services/utils/getErrorMessage'

import { InvitationDetailView } from './InvitationDetailView'

vi.mock('@/services/baseApi', () => ({
  baseApi: {
    injectEndpoints: vi.fn(() => ({
      endpoints: {},
    })),
  },
}))

vi.mock('@/store/hooks/useInvitationActions')

const baseNotification: Notification = {
  id: 'notif-1',
  title: 'Contact invitation',
  message: 'Jhon has invited you to connect.',
  data: { invitationId: 'inv-123' },
  userId: '',
  type: NOTIFICATION_TYPE.TASK,
  read: false,
  createdAt: new Date().toISOString(),
}

const baseProps: InvitationDetailViewProps = {
  notification: baseNotification,
  onBack: vi.fn(),
}

const parsedError = {
  message: 'An error occurred',
  fieldsValidations: { field: 'Field is required' },
} as ParsedError

const mockInviteContact = vi.fn()
const mockAcceptInvitation = vi.fn()
const mockRejectInvitation = vi.fn()

const valueMockInvitationActions = {
  inviting: false,
  accepting: false,
  rejecting: false,
  inviteSuccess: false,
  acceptSuccess: false,
  rejectSuccess: false,
  inviteContact: mockInviteContact,
  acceptInvitation: mockAcceptInvitation,
  rejectInvitation: mockRejectInvitation,
  inviteContactError: parsedError,
  acceptInvitationError: parsedError,
  rejectInvitationError: parsedError,
}

describe('InvitationDetailView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useInvitationActions).mockReturnValue(valueMockInvitationActions)
  })

  it('should render title, message and action buttons', () => {
    render(<InvitationDetailView {...baseProps} />)
    expect(screen.getByText('Contact Invitation')).toBeInTheDocument()
    expect(screen.getByText(baseNotification.title)).toBeInTheDocument()
    expect(screen.getByText(baseNotification.message)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reject/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to notifications/i })).toBeInTheDocument()
  })

  it('should call onBack when back button is clicked', () => {
    render(<InvitationDetailView {...baseProps} />)
    fireEvent.click(screen.getByRole('button', { name: /back to notifications/i }))
    expect(baseProps.onBack).toHaveBeenCalledTimes(1)
  })

  it('calls acceptInvitation and onBack when Accept is clicked', async () => {
    render(<InvitationDetailView {...baseProps} />)
    fireEvent.click(screen.getByRole('button', { name: /accept/i }))
    await waitFor(() => {
      expect(mockAcceptInvitation).toHaveBeenCalledWith({ invitationId: 'inv-123' })
      expect(baseProps.onBack).toHaveBeenCalled()
    })
  })

  it('calls rejectInvitation and onBack when Reject is clicked', async () => {
    render(<InvitationDetailView {...baseProps} />)
    fireEvent.click(screen.getByRole('button', { name: /reject/i }))
    await waitFor(() => {
      expect(mockRejectInvitation).toHaveBeenCalledWith({ invitationId: 'inv-123' })
      expect(baseProps.onBack).toHaveBeenCalled()
    })
  })

  it('disables buttons and shows loading text when accepting', () => {
    vi.mocked(useInvitationActions).mockReturnValue({
      ...valueMockInvitationActions,
      accepting: true,
    })
    render(<InvitationDetailView {...baseProps} />)
    expect(screen.getByRole('button', { name: /accepting/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /reject/i })).toBeDisabled()
  })

  it('disables buttons and shows loading text when rejecting', () => {
    vi.mocked(useInvitationActions).mockReturnValue({
      ...valueMockInvitationActions,
      rejecting: true,
    })
    render(<InvitationDetailView {...baseProps} />)
    expect(screen.getByRole('button', { name: /accept/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /rejecting/i })).toBeDisabled()
  })
})
