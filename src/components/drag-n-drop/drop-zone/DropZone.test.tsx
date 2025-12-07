import { render, screen } from '@testing-library/react'

import { DRAGGABLE_ITEM_SRC, DROPPABLE_ITEM_TARGET } from '@/types/ui/dragNdrop'

import { useDroppable } from '@dnd-kit/core'

import { DropZone } from './DropZone'

import styles from './DropZone.module.css'

vi.mock('@dnd-kit/core')

const mockSetNodeRef = vi.fn()

const baseDroppable = {
  active: null,
  isOver: false,
  setNodeRef: mockSetNodeRef,
  rect: { current: null },
  node: { current: null },
  over: null,
}

describe('DropZone', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useDroppable).mockReturnValue(baseDroppable)
  })

  it('should render children and label for EVENT drop zone (no drag active)', () => {
    render(
      <DropZone itemId="1" itemType={DROPPABLE_ITEM_TARGET.EVENT} label="Assign participant">
        <span>Content</span>
      </DropZone>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    // No label or active zone if there is no drag
    expect(screen.queryByText('Assign participant')).not.toBeInTheDocument()
  })

  it('should show drop zone content and classes when dragging PARTICIPANT over EVENT', () => {
    vi.mocked(useDroppable).mockReturnValue({
      ...baseDroppable,
      active: {
        id: 'mock-id',
        data: { current: { type: DRAGGABLE_ITEM_SRC.PARTICIPANT } },
        rect: {
          current: {
            initial: null,
            translated: null,
          },
        },
      },
      isOver: true,
    })
    render(
      <DropZone itemId="2" itemType={DROPPABLE_ITEM_TARGET.EVENT} label="Assign participant">
        <span>Content</span>
      </DropZone>
    )
    expect(screen.getByText('Assign participant')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveClass(
      styles.dropZone,
      styles.dropZoneActive,
      styles.dropZoneOver,
      styles.dropZoneEvent
    )
  })

  it('shows drop zone content and classes when dragging COLLABORATOR over TRASH', () => {
    vi.mocked(useDroppable).mockReturnValue({
      ...baseDroppable,
      active: {
        id: 'mock-id',
        data: { current: { type: DRAGGABLE_ITEM_SRC.COLLABORATOR } },
        rect: {
          current: {
            initial: null,
            translated: null,
          },
        },
      },
      isOver: true,
    })
    render(
      <DropZone itemId="3" itemType={DROPPABLE_ITEM_TARGET.TRASH} label="Remove collaborator">
        <span>Trash content</span>
      </DropZone>
    )
    expect(screen.getByText('Remove collaborator')).toBeInTheDocument()
    expect(screen.getByText('Trash content')).toBeInTheDocument()
    const section = screen.getByText('Trash content').closest('section')
    expect(section).toHaveClass(
      styles.dropZone,
      styles.dropZoneActive,
      styles.dropZoneOver,
      styles.dropZoneTrash
    )
  })

  it('should not show drop zone content if drag type does not match', () => {
    vi.mocked(useDroppable).mockReturnValue({
      ...baseDroppable,
      active: {
        id: 'mock-id',
        data: { current: { type: DRAGGABLE_ITEM_SRC.COLLABORATOR } },
        rect: {
          current: {
            initial: null,
            translated: null,
          },
        },
      },
      isOver: true,
      setNodeRef: mockSetNodeRef,
    })
    render(
      <DropZone itemId="4" itemType={DROPPABLE_ITEM_TARGET.EVENT} label="Must not appear">
        <span>Content</span>
      </DropZone>
    )
    expect(screen.queryByText('Must not appear')).not.toBeInTheDocument()
  })

  it('should apply ref to section', () => {
    render(
      <DropZone itemId="5" itemType={DROPPABLE_ITEM_TARGET.EVENT}>
        <span>Content</span>
      </DropZone>
    )
    const section = screen.getByText('Content').closest('section')
    expect(mockSetNodeRef).toHaveBeenCalledWith(section)
  })

  it('should render default label if none is provided', () => {
    vi.mocked(useDroppable).mockReturnValue({
      ...baseDroppable,
      active: {
        id: 'mock-id',
        data: { current: { type: DRAGGABLE_ITEM_SRC.PARTICIPANT } },
        rect: {
          current: {
            initial: null,
            translated: null,
          },
        },
      },
      isOver: true,
    })
    render(
      <DropZone itemId="6" itemType={DROPPABLE_ITEM_TARGET.EVENT}>
        <span>Content</span>
      </DropZone>
    )
    expect(screen.getByText('Drop here')).toBeInTheDocument()
  })
})
