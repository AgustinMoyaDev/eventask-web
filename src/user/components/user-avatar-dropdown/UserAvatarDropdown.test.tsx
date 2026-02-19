import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { TASK_STATUS } from '@/types/entities/task'

import { UserAvatarDropdown } from './UserAvatarDropdown'

// Define global mocks for the hooks
vi.mock('@/auth/store/hooks/useAuthState')
vi.mock('@/auth/store/hooks/useAuthMutations')
vi.mock('@/user/store/hooks/useUserProfileQueries')
vi.mock('@/user/store/hooks/useUserContactsQueries')
vi.mock('@/task/store/hooks/useTaskQueries')

// Import mocked references (intercepted above)
import { useAuthState } from '@/auth/store/hooks/useAuthState'
import { useAuthMutations } from '@/auth/store/hooks/useAuthMutations'
import { useUserProfileQueries } from '@/user/store/hooks/useUserProfileQueries'
import { useUserContactsQueries } from '@/user/store/hooks/useUserContactsQueries'
import { useTaskQueries } from '@/task/store/hooks/useTaskQueries'

// --- Auxiliary mocks --- //
const mockLogout = vi.fn()

const mockAuthState = {
  status: 'authenticated',
  currentUserId: '123',
  isAuthenticated: true,
  isChecking: false,
  isNotAuthenticated: false,
  accessToken: 'fake-token',
}

const mockAuthMutations = {
  loginLoading: false,
  loginWithGoogleLoading: false,
  registerLoading: false,
  logoutLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  setPasswordLoading: false,
  changePasswordLoading: false,
  logout: mockLogout,
  login: vi.fn(),
  loginWithGoogle: vi.fn(),
  register: vi.fn(),
  refresh: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
  setPassword: vi.fn(),
  changePassword: vi.fn(),
  loginError: { message: '', fieldErrors: {} },
  loginWithGoogleError: { message: '', fieldErrors: {} },
  registerError: { message: '', fieldErrors: {} },
  refreshError: { message: '', fieldErrors: {} },
  forgotPasswordError: { message: '', fieldErrors: {} },
  resetPasswordError: { message: '', fieldErrors: {} },
  setPasswordError: { message: '', fieldErrors: {} },
  changePasswordError: { message: '', fieldErrors: {} },
  logoutError: { message: '', fieldErrors: {} },
}

const user = {
  firstName: 'John',
  lastName: 'Doe',
  profileImageURL: '',
  email: '',
  contacts: [],
  id: '',
  createdAt: new Date().toISOString(),
  hasManualPassword: true,
  contactsIds: [],
  isEmailVerified: true,
}

const mockUserProfile = {
  user,
  fetchingProfile: false,
  refetchProfile: vi.fn(),
  updatingProfile: false,
  updateSuccess: true,
  updateProfile: vi.fn(),
  uploadSuccess: true,
  uploadingAvatar: false,
  uploadAvatar: vi.fn(),
  fetchUserError: { message: '', fieldErrors: {} },
  updateUserError: { message: '', fieldErrors: {} },
  uploadUserAvatarError: { message: '', fieldErrors: {} },
}

const mockUserContacts = {
  contacts: [],
  total: 0,
  fetching: false,
  refetchContacts: vi.fn(),
  fetchContactsError: { message: '', fieldErrors: {} },
}

const creator = {
  id: '1',
  firstName: 'Creator',
  lastName: '1',
  profileImageURL: '',
  email: '',
  contacts: [],
  contactsIds: [],
  createdAt: new Date().toISOString(),
  hasManualPassword: true,
  isEmailVerified: true,
}

const category = {
  id: 'cat1',
  name: 'Design',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const mockTasksQueries = {
  tasks: [
    {
      id: '2',
      status: TASK_STATUS.PENDING,
      title: 'Task 2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categoryId: '',
      participantsIds: [],
      eventsIds: [],
      createdBy: '123',
      category: category,
      creator,
      participants: [],
      events: [],
      beginningDate: '',
      completionDate: '',
      duration: 0,
      progress: 0,
    },
    {
      id: '1',
      status: TASK_STATUS.PENDING,
      title: 'Task 1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categoryId: '',
      participantsIds: [],
      eventsIds: [],
      createdBy: '123',
      category: category,
      creator,
      participants: [],
      events: [],
      beginningDate: '',
      completionDate: '',
      duration: 0,
      progress: 0,
    },
  ],
  total: 2,
  fetching: false,
  refetch: vi.fn(),
  fetchTaskError: { message: '', fieldErrors: {} },
}

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('AvatarDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthState).mockReturnValue(mockAuthState)
    vi.mocked(useAuthMutations).mockReturnValue(mockAuthMutations)
    vi.mocked(useUserProfileQueries).mockReturnValue(mockUserProfile)
    vi.mocked(useUserContactsQueries).mockReturnValue(mockUserContacts)
    vi.mocked(useTaskQueries).mockReturnValue(mockTasksQueries)
  })

  it('returns null if no currentUserId', () => {
    vi.mocked(useAuthState).mockReturnValue({
      ...mockAuthState,
      currentUserId: undefined,
    })

    vi.mocked(useUserProfileQueries).mockReturnValue({
      ...mockUserProfile,
      user: undefined,
    })

    vi.mocked(useTaskQueries).mockReturnValue(mockTasksQueries)

    renderWithRouter(<UserAvatarDropdown />)

    expect(screen.queryByLabelText('User menu')).not.toBeInTheDocument()
  })

  it('renders user avatar and name', () => {
    renderWithRouter(<UserAvatarDropdown />)
    expect(screen.getByLabelText('User menu')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('displays correct pending tasks count', () => {
    renderWithRouter(<UserAvatarDropdown />)
    expect(screen.getByText('2 pending tasks')).toBeInTheDocument()
  })

  it('shows menu items with correct roles and labels', () => {
    renderWithRouter(<UserAvatarDropdown />)
    expect(screen.getByRole('menuitem', { name: /Profile/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Sign out/i })).toBeInTheDocument()
  })

  it('calls logout when clicking Sign out', () => {
    renderWithRouter(<UserAvatarDropdown />)
    fireEvent.click(screen.getByRole('menuitem', { name: /Sign out/i }))
    expect(mockLogout).toHaveBeenCalledTimes(1)
  })
})
