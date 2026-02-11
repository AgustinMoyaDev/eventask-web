import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { TASK_STATUS } from '@/types/entities/task'

import { AvatarDropdown } from './AvatarDropdown'

// Definimos mocks globales de los hooks
vi.mock('@/store/hooks/useAuthActions')
vi.mock('@/store/hooks/useUserActions')
vi.mock('@/store/hooks/useTaskActions')

// Importamos las referencias mockeadas (ya interceptadas arriba)
import { useAuthActions } from '@/store/hooks/useAuthActions'
import { useUserActions } from '@/store/hooks/useUserActions'
import { useTaskActions } from '@/store/hooks/useTaskActions'

// --- Mocks auxiliares --- //
const mockLogout = vi.fn()

const valueMockAuthActions = {
  status: 'authenticated',
  currentUserId: '123',
  isAuthenticated: true,
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

const valueMockUserActions = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    profileImageURL: '',
    email: '',
    contacts: [],
    id: '',
    createdAt: new Date(),
    hasManualPassword: true,
  },
  contacts: [],
  total: 0,
  fetching: false,
  fetchingProfile: false,
  updatingProfile: false,
  uploadingAvatar: false,
  updateSuccess: true,
  uploadSuccess: true,
  refetchProfile: vi.fn(),
  refetchContacts: vi.fn(),
  updateProfile: vi.fn(),
  uploadAvatar: vi.fn(),
  fetchUserError: { message: '', fieldsValidations: {} },
  updateUserError: { message: '', fieldsValidations: {} },
  uploadUserAvatarError: { message: '', fieldsValidations: {} },
  fetchContactsError: { message: '', fieldsValidations: {} },
}

const valueMockTasksActions = {
  tasks: [
    {
      id: '2',
      status: TASK_STATUS.PENDING,
      title: 'Task 2',
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: '',
      participantsIds: [],
      eventsIds: [],
      createdBy: '123',
      category: {
        id: 'cat2',
        name: 'Category 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      creator: {
        id: '1',
        firstName: 'Creator',
        lastName: '1',
        profileImageURL: '',
        email: '',
        contacts: [],
        createdAt: new Date(),
        hasManualPassword: true,
      },
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
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: '',
      participantsIds: [],
      eventsIds: [],
      createdBy: '123',
      category: {
        id: 'cat1',
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      creator: {
        id: '1',
        firstName: 'Creator',
        lastName: '1',
        profileImageURL: '',
        email: '',
        contacts: [],
        createdAt: new Date(),
        hasManualPassword: false,
      },
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
    vi.mocked(useAuthActions).mockReturnValue(valueMockAuthActions)
    vi.mocked(useUserActions).mockReturnValue(valueMockUserActions)
    vi.mocked(useTaskActions).mockReturnValue(valueMockTasksActions)
  })

  it('returns null if no user or currentUserId', () => {
    vi.mocked(useAuthActions).mockReturnValue({
      ...valueMockAuthActions,
      currentUserId: undefined,
    })
    vi.mocked(useUserActions).mockReturnValue({
      ...valueMockUserActions,
      user: undefined,
    })
    vi.mocked(useTaskActions).mockReturnValue(valueMockTasksActions)

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
