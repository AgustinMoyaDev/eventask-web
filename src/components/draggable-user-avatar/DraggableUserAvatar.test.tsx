import { render, screen } from '@testing-library/react'

import { DRAGGABLE_ITEM_SRC, ParticipantDragData } from '@/types/ui/dragNdrop'

import { DraggableUserAvatar } from './DraggableUserAvatar'
import { Draggable } from '../drag-n-drop/draggable/Draggable'
import { UserAvatar } from '../user-avatar/UserAvatar'

vi.mock('../drag-n-drop/draggable/Draggable', () => ({
  Draggable: vi.fn(({ children, ...props }) => (
    <div data-testid="draggable-mock" {...props}>
      {children}
    </div>
  )),
}))
vi.mock('../user-avatar/UserAvatar', () => ({
  UserAvatar: vi.fn(({ firstName, lastName, ariaLabel }) => (
    <div data-testid="user-avatar-mock" aria-label={ariaLabel}>
      {firstName} {lastName}
    </div>
  )),
}))

const participantData: ParticipantDragData = {
  type: DRAGGABLE_ITEM_SRC.PARTICIPANT,
  id: 42,
  imageUrl: 'https://cdn.com/avatar.jpg',
  firstName: 'Ada',
  lastName: 'Lovelace',
}

describe('DraggableUserAvatar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render Draggable with UserAvatar as child', () => {
    render(<DraggableUserAvatar data={participantData} />)
    expect(screen.getByTestId('draggable-mock')).toBeInTheDocument()
    expect(screen.getByTestId('user-avatar-mock')).toBeInTheDocument()
    expect(screen.getByLabelText('Ada Lovelace avatar')).toBeInTheDocument()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
  })

  it('should pass correct props to Draggable', () => {
    render(<DraggableUserAvatar data={participantData} className="custom-class" disabled />)
    expect(Draggable).toHaveBeenCalledWith(
      expect.objectContaining({
        data: participantData,
        className: 'custom-class',
        disabled: true,
      }),
      expect.anything()
    )
  })

  it('should pass correct props to UserAvatar', () => {
    render(<DraggableUserAvatar data={participantData} size="md" />)
    expect(UserAvatar).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: '42',
        imageUrl: 'https://cdn.com/avatar.jpg',
        firstName: 'Ada',
        lastName: 'Lovelace',
        size: 'md',
        ariaLabel: 'Ada Lovelace avatar',
      }),
      expect.anything()
    )
  })

  it('should use default size "sm" if not provided', () => {
    render(<DraggableUserAvatar data={participantData} />)
    expect(UserAvatar).toHaveBeenCalledWith(
      expect.objectContaining({ size: 'sm' }),
      expect.anything()
    )
  })
})
