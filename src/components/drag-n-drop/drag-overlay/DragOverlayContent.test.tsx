import { render, screen } from '@testing-library/react'

import { ParticipantDragData } from '@/user/types/user-drag.types'
import { USER_DRAG_TYPES } from '@/user/constants/user-drag.constants'

import { DragOverlayContent } from './DragOverlayContent'

const participantData: ParticipantDragData = {
  type: USER_DRAG_TYPES.PARTICIPANT,
  id: 123,
  imageUrl: 'https://example.com/avatar.jpg',
  firstName: 'John',
  lastName: 'Doe',
}

const collaboratorData: ParticipantDragData = {
  type: USER_DRAG_TYPES.COLLABORATOR,
  id: 456,
  imageUrl: '',
  firstName: 'Jane',
  lastName: 'Smith',
}

describe('DragOverlayContent', () => {
  it('should render participant avatar with accessible label', () => {
    render(<DragOverlayContent data={participantData} />)
    const avatar = screen.getByLabelText(/dragged user/i)
    expect(avatar).toBeInTheDocument()
  })

  it('should render collaborator avatar with accessible label', () => {
    render(<DragOverlayContent data={collaboratorData} />)
    const avatar = screen.getByLabelText(/dragged user/i)
    expect(avatar).toBeInTheDocument()
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
