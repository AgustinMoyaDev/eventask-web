import { render, screen } from '@testing-library/react'

import { DRAGGABLE_ITEM_SRC } from '@/types/ui/dragNdrop'
import type { ParticipantDragData } from '@/types/ui/dragNdrop'

import { DragOverlayContent } from './DragOverlayContent'

import styles from './DragOverlayContent.module.css'

// Simulate UserAvatar to isolate the logic of DragOverlayContent
vi.mock('@/components/user-avatar/UserAvatar', () => ({
  UserAvatar: vi.fn(({ firstName, lastName, ariaLabel }) => (
    <div data-testid="user-avatar" aria-label={ariaLabel}>
      {firstName} {lastName}
    </div>
  )),
}))

const participantData: ParticipantDragData = {
  type: DRAGGABLE_ITEM_SRC.PARTICIPANT,
  id: 123,
  imageUrl: 'https://example.com/avatar.jpg',
  firstName: 'John',
  lastName: 'Doe',
}

const collaboratorData: ParticipantDragData = {
  type: DRAGGABLE_ITEM_SRC.COLLABORATOR,
  id: 456,
  imageUrl: '',
  firstName: 'Jane',
  lastName: 'Smith',
}

describe('DragOverlayContent', () => {
  it('should render participant drag overlay with UserAvatar', () => {
    render(<DragOverlayContent data={participantData} />)

    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByLabelText('Dragged user')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should render collaborator drag overlay with UserAvatar', () => {
    render(<DragOverlayContent data={collaboratorData} />)

    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByLabelText('Dragged user')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('applies correct CSS classes for participant (user)', () => {
    const { container } = render(<DragOverlayContent data={participantData} />)

    expect(container.querySelector(`.${styles.dragOverlay}`)).toBeInTheDocument()
    expect(container.querySelector(`.${styles.dragOverlayUser}`)).toBeInTheDocument()
  })

  it('applies correct CSS classes for collaborator (user)', () => {
    const { container } = render(<DragOverlayContent data={collaboratorData} />)

    expect(container.querySelector(`.${styles.dragOverlay}`)).toBeInTheDocument()
    expect(container.querySelector(`.${styles.dragOverlayUser}`)).toBeInTheDocument()
  })

  it('returns null for unknown drag type', () => {
    const unknownData = {
      type: 'UNKNOWN_TYPE' as unknown,
      id: 999,
    } as unknown as ParticipantDragData

    const { container } = render(<DragOverlayContent data={unknownData} />)
    expect(container.firstChild).toBeNull()
  })
})
