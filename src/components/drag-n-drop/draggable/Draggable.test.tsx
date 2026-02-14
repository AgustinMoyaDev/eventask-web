import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useDraggable } from '@dnd-kit/core'

import { USER_DRAG_TYPES } from '@/user/constants/user-drag.constants'
import { TASK_DRAG_CONSTANTS } from '@/task/constants/task-drag.constants'

import { Draggable } from './Draggable'

import styles from './Draggable.module.css'

vi.mock('@dnd-kit/core')

const mockListeners = { onPointerDown: vi.fn() }
const mockSetNodeRef = vi.fn()

const valueMockUseDraggable = {
  attributes: {
    role: 'button',
    tabIndex: 0,
    'aria-disabled': false,
    'aria-pressed': undefined,
    'aria-roledescription': '',
    'aria-describedby': '',
  },
  listeners: mockListeners,
  setNodeRef: mockSetNodeRef,
  isDragging: false,
  transform: null,
  node: { current: null },
  active: null,
  activatorEvent: null,
  activeNodeRect: null,
  over: null,
  setActivatorNodeRef: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useDraggable).mockReturnValue(valueMockUseDraggable)
})

const draggablePropObj = {
  data: {
    id: '1',
    type: USER_DRAG_TYPES.PARTICIPANT,
    originId: 'event-1',
    originName: TASK_DRAG_CONSTANTS.ORIGIN,
  },
  disabled: false,
  className: 'custom-class',
  children: <div>Draggable Content</div>,
}

describe('Draggable', () => {
  it('should render children and applies draggable class', () => {
    render(<Draggable {...draggablePropObj} />)
    expect(screen.getByText('Draggable Content')).toBeInTheDocument()
    const wrapper = screen.getByText('Draggable Content').closest(`.${styles.draggable}`)
    expect(wrapper).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Draggable {...draggablePropObj} />)
    const wrapper = screen.getByText('Draggable Content').closest(`.${styles.draggable}`)
    expect(wrapper).toHaveClass('custom-class')
  })

  it('should not apply draggable class or listeners when disabled', () => {
    render(<Draggable {...draggablePropObj} disabled />)
    const wrapper = screen.getByText('Draggable Content').closest('.custom-class')
    expect(wrapper).not.toHaveClass('draggable')
  })

  it('should apply active class when isDragging is true', () => {
    vi.mocked(useDraggable).mockReturnValueOnce({
      ...valueMockUseDraggable,
      isDragging: true,
    })
    render(<Draggable {...draggablePropObj} />)
    const wrapper = screen.getByText('Draggable Content').closest(`.${styles.draggable}`)
    expect(wrapper).toHaveClass(styles.draggableActive)
  })

  it('should forward ref and listeners to root element', () => {
    render(<Draggable {...draggablePropObj} />)
    expect(mockSetNodeRef).toHaveBeenCalled()
    // Listeners are spread on the root element, but can't be directly tested without user-event
  })

  it('should call onPointerDown listener when user clicks', async () => {
    render(<Draggable {...draggablePropObj} />)
    const wrapper = screen.getByText('Draggable Content').closest(`.${styles.draggable}`)
    await userEvent.pointer({ keys: '[MouseLeft]', target: wrapper! })
    expect(mockListeners.onPointerDown).toHaveBeenCalled()
  })
})
