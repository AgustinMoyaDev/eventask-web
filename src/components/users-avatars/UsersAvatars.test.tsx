import { render, screen } from '@testing-library/react'
import { UsersAvatars } from '@/components/users-avatars/UsersAvatars'
import { DRAGGABLE_ITEM_SRC, ORIGIN_NAME } from '@/types/ui/dragNdrop'

import styles from './UsersAvatars.module.css'

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
    createdAt: new Date(),
    hasManualPassword: true,
  },
  {
    id: '2',
    profileImageURL: 'b.jpg',
    firstName: 'Alan',
    lastName: 'Turing',
    email: 'ada@lovelace.com',
    contacts: [],
    createdAt: new Date(),
    hasManualPassword: true,
  },
  {
    id: '3',
    profileImageURL: 'c.jpg',
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'ada@lovelace.com',
    contacts: [],
    createdAt: new Date(),
    hasManualPassword: true,
  },
  {
    id: '4',
    profileImageURL: 'd.jpg',
    firstName: 'Linus',
    lastName: 'Torvalds',
    email: 'ada@lovelace.com',
    contacts: [],
    createdAt: new Date(),
    hasManualPassword: true,
  },
]

const draggable = {
  id: '99',
  type: DRAGGABLE_ITEM_SRC.PARTICIPANT,
  originId: '99',
  originName: ORIGIN_NAME.TASK,
}

describe('UsersAvatars', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render up to 3 UserAvatar components when draggable is not set', () => {
    render(<UsersAvatars users={users} />)
    expect(screen.getAllByTestId('user-avatar')).toHaveLength(3)
    expect(screen.queryByTestId('draggable-avatar')).toBeNull()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('Alan Turing')).toBeInTheDocument()
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument()
  })

  it('should render DraggableUserAvatar when draggable is set', () => {
    render(<UsersAvatars users={users} draggable={draggable} />)
    expect(screen.getAllByTestId('draggable-avatar')).toHaveLength(3)
    expect(screen.queryByTestId('user-avatar')).toBeNull()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('Alan Turing')).toBeInTheDocument()
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument()
  })

  it('should render "+N" indicator when more than 3 users', () => {
    render(<UsersAvatars users={users} />)
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('should not render "+N" indicator when 3 or fewer users', () => {
    render(<UsersAvatars users={users.slice(0, 3)} />)
    expect(screen.queryByText('+1')).toBeNull()
  })

  it('should apply custom className to section', () => {
    render(<UsersAvatars users={users} className="custom-class" />)
    const userAvatar = screen.queryByText('Ada Lovelace')
    const parentSection = userAvatar?.closest('section')
    expect(parentSection).toHaveClass(styles.avatars, 'custom-class')
  })

  it('renders nothing if users is empty', () => {
    render(<UsersAvatars users={[]} />)
    expect(screen.queryByTestId('user-avatar')).toBeNull()
    expect(screen.queryByTestId('draggable-avatar')).toBeNull()
    expect(screen.queryByText('+1')).toBeNull()
  })
})
