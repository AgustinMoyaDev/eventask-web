import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ToastContainer } from './ToastContainer'
import { Toast, TOAST_STATUS } from '../toast/toast.types'

import styles from './ToastContainer.module.css'

vi.mock('@/store/hooks/useToastActions')

import { useToastActions } from '@/store/hooks/useToastActions'

const mockUseToastActions = vi.mocked(useToastActions)

const mockShowToast = vi.fn()
const mockRemoveToast = vi.fn()
const mockUpdateToastStatus = vi.fn()

const valueMockToastActions = {
  toasts: [],
  showToast: mockShowToast,
  removeToast: mockRemoveToast,
  updateToastStatus: mockUpdateToastStatus,
}

describe('ToastContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseToastActions.mockReturnValue(valueMockToastActions)
  })

  it('should call useToastActions hook', () => {
    render(<ToastContainer />)
    expect(mockUseToastActions).toHaveBeenCalledTimes(1)
  })

  it('should render container with correct ARIA attributes', () => {
    render(<ToastContainer />)

    const container = screen.getByRole('status')
    expect(container).toHaveClass(styles.toastContainer)
    expect(container).toHaveAttribute('aria-live', 'polite')
  })

  it('should render empty container when no toasts', () => {
    render(<ToastContainer />)

    const container = screen.getByRole('status')
    expect(container).toBeInTheDocument()
    expect(container).toBeEmptyDOMElement()
  })

  it('should render single toast', () => {
    const toast: Toast = {
      id: '1',
      message: 'Test message',
      status: TOAST_STATUS.SUCCESS,
      duration: 3000,
    }

    mockUseToastActions.mockReturnValue({
      ...valueMockToastActions,
      toasts: [toast],
    })

    render(<ToastContainer />)

    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('should render multiple toasts in order', () => {
    const toasts: Toast[] = [
      {
        id: '1',
        message: 'First toast',
        status: TOAST_STATUS.SUCCESS,
        duration: 3000,
      },
      {
        id: '2',
        message: 'Second toast',
        status: TOAST_STATUS.ERROR,
        duration: 5000,
      },
      {
        id: '3',
        message: 'Third toast',
        status: TOAST_STATUS.LOADING,
      },
    ]

    mockUseToastActions.mockReturnValue({
      ...valueMockToastActions,
      toasts: toasts,
    })

    render(<ToastContainer />)

    expect(screen.getByText('First toast')).toBeInTheDocument()
    expect(screen.getByText('Second toast')).toBeInTheDocument()
    expect(screen.getByText('Third toast')).toBeInTheDocument()
  })
})
