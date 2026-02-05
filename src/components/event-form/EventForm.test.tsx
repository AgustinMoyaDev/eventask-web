import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EVENT_STATUS } from '@/types/IEvent'
import { COLOR_PROGRESS } from '@/types/ui/task'

import { EventForm } from './EventForm'
import { useEventForm } from './useEventForm'

vi.mock('./useEventForm')

const mockUseEventForm = vi.mocked(useEventForm)

const baseMockReturn = {
  // RHF Props
  register: vi.fn(name => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  })),
  formErrors: {},
  isFormValid: true,
  isDirty: false,

  // Custom Props
  hasConflict: false,
  isStatusCompleted: false,
  colorChip: COLOR_PROGRESS.pending,
  currentStatus: EVENT_STATUS.PENDING,

  // Actions
  handleSubmit: vi.fn((e?: React.BaseSyntheticEvent) => {
    e?.preventDefault()
    return Promise.resolve()
  }),
  handleResetForm: vi.fn(),
}

describe('EventForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseEventForm.mockReturnValue(baseMockReturn)
  })

  it('should render all fields and buttons in creation mode', () => {
    render(<EventForm onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Create event')
  })

  it('should render edit mode when eventToEdit is provided', () => {
    const eventToEdit = {
      id: '1',
      title: 'Test Event',
      start: '2023-12-01T10:00',
      end: '2023-12-01T11:00',
      notes: 'Test notes',
      status: EVENT_STATUS.PENDING,
    }

    render(<EventForm eventToEdit={eventToEdit} onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    expect(screen.getByRole('button', { name: /edit event/i })).toBeInTheDocument()
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Edit event')
  })

  it('should call handleSubmit when form is submitted', async () => {
    mockUseEventForm.mockReturnValue({
      ...baseMockReturn,
      isFormValid: true,
    })

    render(<EventForm onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    const form = screen.getByRole('form', { name: /event form/i })
    fireEvent.submit(form)

    expect(baseMockReturn.handleSubmit).toHaveBeenCalled()
  })

  it('should show conflict error message when hasConflict is true', () => {
    mockUseEventForm.mockReturnValue({
      ...baseMockReturn,
      hasConflict: true,
    })

    render(<EventForm onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    expect(screen.getByText(/another event is already occupying/i)).toBeInTheDocument()
  })

  it(' should disable fieldset and submit button when isStatusCompleted is true', () => {
    mockUseEventForm.mockReturnValue({
      ...baseMockReturn,
      isStatusCompleted: true,
    })

    render(<EventForm onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    expect(screen.getByLabelText(/title/i)).toBeDisabled()
    expect(screen.getByLabelText(/start date/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /create/i })).toBeDisabled()
  })

  it('should disable submit button when form is invalid or has conflict', () => {
    mockUseEventForm.mockReturnValue({
      ...baseMockReturn,
      isFormValid: false,
      hasConflict: true,
    })

    render(<EventForm onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    expect(screen.getByRole('button', { name: /create/i })).toBeDisabled()
  })

  it('should call handleResetForm when reset button is clicked', async () => {
    const user = userEvent.setup()
    const handleResetForm = vi.fn()

    mockUseEventForm.mockReturnValue({
      ...baseMockReturn,
      handleResetForm,
    })

    render(<EventForm onAddEvent={vi.fn()} onUpdateEvent={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(handleResetForm).toHaveBeenCalled()
  })
})
