import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { TASK_STATUS } from '@/types/entities/task'

import { AvatarDropdown } from './AvatarDropdown'

// Define global mocks for the hooks
vi.mock('@/auth/hooks/useAuthState')
vi.mock('@/auth/hooks/useAuthMutations')
vi.mock('@/user/hooks/useUserProfile')
vi.mock('@/user/hooks/useUserContacts')
vi.mock('@/store/hooks/useTaskActions')

// Import mocked references (intercepted above)
import { useAuthState } from '@/auth/hooks/useAuthState'
import { useAuthMutations } from '@/auth/hooks/useAuthMutations'
import { useUserProfile } from '@/user/hooks/useUserProfile'
import { useUserContacts } from '@/user/hooks/useUserContacts'
import { useTaskActions } from '@/store/hooks/useTaskActions'

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
  loginAuthError: { message: '', fieldsValidations: {} },
  loginWithGoogleAuthError: { message: '', fieldsValidations: {} },
  registerAuthError: { message: '', fieldsValidations: {} },
  refreshAuthError: { message: '', fieldsValidations: {} },
  forgotPasswordAuthError: { message: '', fieldsValidations: {} },
  resetPasswordAuthError: { message: '', fieldsValidations: {} },
  setPasswordAuthError: { message: '', fieldsValidations: {} },
  changePasswordAuthError: { message: '', fieldsValidations: {} },
  logoutError: undefined,
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
  fetchUserError: { message: '', fieldsValidations: {} },
  updateUserError: { message: '', fieldsValidations: {} },
  uploadUserAvatarError: { message: '', fieldsValidations: {} },
}

const mockUserContacts = {
  contacts: [],
  total: 0,
  fetching: false,
  refetchContacts: vi.fn(),
  fetchContactsError: { message: '', fieldsValidations: {} },
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

const mockTasksActions = {
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
  creating: false,
  updating: false,
  deleting: false,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  setActiveTaskId: Object.assign(vi.fn(), {
    type: 'task/setActiveTaskId' as const,
    match: (
      _action: unknown
    ): _action is { payload: string | undefined; type: 'task/setActiveTaskId' } => false,
  }),
  refetch: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  fetchTaskError: { message: '', fieldsValidations: {} },
  createTaskError: { message: '', fieldsValidations: {} },
  updateTaskError: { message: '', fieldsValidations: {} },
  deleteTaskError: { message: '', fieldsValidations: {} },
}

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('AvatarDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthState).mockReturnValue(mockAuthState)
    vi.mocked(useAuthMutations).mockReturnValue(mockAuthMutations)
    vi.mocked(useUserProfile).mockReturnValue(mockUserProfile)
    vi.mocked(useUserContacts).mockReturnValue(mockUserContacts)
    vi.mocked(useTaskActions).mockReturnValue(mockTasksActions)
  })

  it('returns null if no currentUserId', () => {
    vi.mocked(useAuthState).mockReturnValue({
      ...mockAuthState,
      currentUserId: undefined,
    })

    vi.mocked(useUserProfile).mockReturnValue({
      ...mockUserProfile,
      user: undefined,
    })

    vi.mocked(useTaskActions).mockReturnValue(mockTasksActions)

    renderWithRouter(<AvatarDropdown />)

    expect(screen.queryByLabelText('User menu')).not.toBeInTheDocument()
  })

  it('renders user avatar and name', () => {
    renderWithRouter(<AvatarDropdown />)
    expect(screen.getByLabelText('User menu')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('displays correct pending tasks count', () => {
    renderWithRouter(<AvatarDropdown />)
    expect(screen.getByText('2 pending tasks')).toBeInTheDocument()
  })

  it('shows menu items with correct roles and labels', () => {
    renderWithRouter(<AvatarDropdown />)
    expect(screen.getByRole('menuitem', { name: /Profile/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Sign out/i })).toBeInTheDocument()
  })

  it('calls logout when clicking Sign out', () => {
    renderWithRouter(<AvatarDropdown />)
    fireEvent.click(screen.getByRole('menuitem', { name: /Sign out/i }))
    expect(mockLogout).toHaveBeenCalledTimes(1)
  })
})
