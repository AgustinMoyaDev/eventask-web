import { act } from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { IToast, TOAST_STATUS } from '@/types/ui/toast'

import { Toast } from './Toast'

import styles from './Toast.module.css'

describe('Toast', () => {
  const removeToast = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers() // <-- Activa fake timers ANTES de cada test
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers() // <-- Restaura timers reales después de cada test
  })

  it('should render loading toast with loader', async () => {
    const toast: IToast = {
      id: '1',
      message: 'Loading...',
      status: TOAST_STATUS.LOADING,
    }
    render(<Toast toast={toast} removeToast={removeToast} />)

    const toastElement = screen.getByRole('status')
    const messageText = screen.getByText('Loading...')
    const loaderElement = document.querySelector(`.${styles.toastLoader}`)
    const progressElement = document.querySelector(`.${styles.toastProgress}`)

    expect(toastElement).toBeInTheDocument()
    expect(messageText).toBeInTheDocument()
    expect(loaderElement).toBeInTheDocument()
    expect(progressElement).not.toBeInTheDocument()
  })

  it('should render success toast with check icon', async () => {
    const toast: IToast = {
      id: '2',
      message: 'Success!',
      status: TOAST_STATUS.SUCCESS,
      duration: 3000,
    }

    render(<Toast toast={toast} removeToast={removeToast} />)

    const toastElement = screen.getByRole('status')
    const messageText = screen.getByText('Success!')
    const iconElement = document.querySelector(`.${styles.toastIcon}`)
    const progressElement = document.querySelector(`.${styles.toastProgress}`)

    expect(toastElement).toBeInTheDocument()
    expect(messageText).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(progressElement).toBeInTheDocument()
  })

  it('should render error toast with error icon and alert role', () => {
    const toast: IToast = {
      id: '3',
      message: 'Error occurred',
      status: TOAST_STATUS.ERROR,
      duration: 5000,
    }

    render(<Toast toast={toast} removeToast={removeToast} />)

    const toastElement = screen.getByRole('alert')
    const messageText = screen.getByText('Error occurred')
    const iconElement = document.querySelector(`.${styles.toastIcon}`)
    const progressElement = document.querySelector(`.${styles.toastProgress}`)

    expect(toastElement).toBeInTheDocument()
    expect(messageText).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(progressElement).toBeInTheDocument()
  })

  it('should apply correct CSS classes based on status', () => {
    const toast: IToast = {
      id: '4',
      message: 'Test message',
      status: TOAST_STATUS.SUCCESS,
      duration: 1000,
    }

    render(<Toast toast={toast} removeToast={removeToast} />)

    const toastElement = screen.getByRole('status')
    expect(toastElement).toHaveClass(styles.toast, styles.success)
    expect(toastElement).not.toHaveClass(styles.toastExiting)
  })

  it('should start exit animation and remove toast after duration', async () => {
    const toast: IToast = {
      id: '5',
      message: 'Auto remove',
      status: TOAST_STATUS.SUCCESS,
      duration: 1000,
    }

    render(<Toast toast={toast} removeToast={removeToast} />)
    const toastElement = screen.getByRole('status')
    expect(toastElement).not.toHaveClass(styles.toastExiting)

    // Avanza 1000ms para disparar setIsExiting(true)
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    const updatedElement = screen.getByRole('status')
    expect(updatedElement).toHaveClass(styles.toastExiting)

    // Avanza 300ms para disparar removeToast
    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(removeToast).toHaveBeenCalledWith('5')
  })

  it('should not auto-remove loading toast', async () => {
    const toast: IToast = {
      id: '6',
      message: 'Loading forever',
      status: TOAST_STATUS.LOADING,
    }

    render(<Toast toast={toast} removeToast={removeToast} />)

    // Fast-forward a long time
    await act(async () => {
      vi.advanceTimersByTime(10000)
    })

    expect(removeToast).not.toHaveBeenCalled()
    expect(screen.getByRole('status')).not.toHaveClass(styles.toastExiting)
  })

  it('should cleanup timers on unmount', async () => {
    const toast: IToast = {
      id: '7',
      message: 'Will unmount',
      status: TOAST_STATUS.SUCCESS,
      duration: 2000,
    }

    const { unmount } = render(<Toast toast={toast} removeToast={removeToast} />)

    // Unmount before timeout
    unmount()

    // Fast-forward past when removal should have happened
    await act(async () => {
      vi.advanceTimersByTime(3000)
    })
    expect(removeToast).not.toHaveBeenCalled()
  })

  it('should use default duration of 0 when not provided', async () => {
    const toast: IToast = {
      id: '8',
      message: 'No duration',
      status: TOAST_STATUS.SUCCESS,
      // duration not provided
    }

    render(<Toast toast={toast} removeToast={removeToast} />)

    // Should start exit immediately (duration = 0)
    await act(async () => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.getByRole('status')).toHaveClass(styles.toastExiting)
  })
})
