import { render, screen } from '@testing-library/react'

import { USER_DRAG_TYPES } from '@/user/constants/user-drag.constants'
import { TASK_DRAG_CONSTANTS } from '@/task/constants/task-drag.constants'

import { UserAvatarList } from './UserAvatarList'

import styles from './UserAvatarList.module.css'

vi.mock('../draggable-user-avatar/DraggableUserAvatar', () => ({
  DraggableUserAvatar: vi.fn(({ data }) => (
    <div data-testid="draggable-avatar">
      {data.firstName} {data.lastName}
    </div>
  )),
}))
vi.mock('../user-avatar/UserAvatar', () => ({
  UserAvatar: vi.fn(({ firstName, lastName }) => (
    <div data-testid="user-avatar">
      {firstName} {lastName}
    </div>
  )),
}))

const users = [
  {
    id: '1',
    profileImageURL: 'a.jpg',
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@lovelace.com',
    contacts: [],
    contactsIds: [],
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    hasManualPassword: true,
  },
  {
    id: '2',
    profileImageURL: 'b.jpg',
    firstName: 'Alan',
    lastName: 'Turing',
    email: 'ada@lovelace.com',
    contacts: [],
    contactsIds: [],
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    hasManualPassword: true,
  },
  {
    id: '3',
    profileImageURL: 'c.jpg',
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'ada@lovelace.com',
    contacts: [],
    contactsIds: [],
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    hasManualPassword: true,
  },
  {
    id: '4',
    profileImageURL: 'd.jpg',
    firstName: 'Linus',
    lastName: 'Torvalds',
    email: 'ada@lovelace.com',
    contacts: [],
    contactsIds: [],
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    hasManualPassword: true,
  },
]

const draggable = {
  id: '99',
  type: USER_DRAG_TYPES.PARTICIPANT,
  originId: '99',
  originName: TASK_DRAG_CONSTANTS.ORIGIN,
}

describe('UsersAvatars', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render up to 3 UserAvatar components when draggable is not set', () => {
    render(<UserAvatarList users={users} />)
    expect(screen.getAllByTestId('user-avatar')).toHaveLength(3)
    expect(screen.queryByTestId('draggable-avatar')).toBeNull()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('Alan Turing')).toBeInTheDocument()
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument()
  })

  it('should render DraggableUserAvatar when draggable is set', () => {
    render(<UserAvatarList users={users} draggable={draggable} />)
    expect(screen.getAllByTestId('draggable-avatar')).toHaveLength(3)
    expect(screen.queryByTestId('user-avatar')).toBeNull()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('Alan Turing')).toBeInTheDocument()
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument()
  })

  it('should render "+N" indicator when more than 3 users', () => {
    render(<UserAvatarList users={users} />)
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('should not render "+N" indicator when 3 or fewer users', () => {
    render(<UserAvatarList users={users.slice(0, 3)} />)
    expect(screen.queryByText('+1')).toBeNull()
  })

  it('should apply custom className to section', () => {
    render(<UserAvatarList users={users} className="custom-class" />)
    const userAvatar = screen.queryByText('Ada Lovelace')
    const parentSection = userAvatar?.closest('section')
    expect(parentSection).toHaveClass(styles.avatars, 'custom-class')
  })

  it('renders nothing if users is empty', () => {
    render(<UserAvatarList users={[]} />)
    expect(screen.queryByTestId('user-avatar')).toBeNull()
    expect(screen.queryByTestId('draggable-avatar')).toBeNull()
    expect(screen.queryByText('+1')).toBeNull()
  })
})
