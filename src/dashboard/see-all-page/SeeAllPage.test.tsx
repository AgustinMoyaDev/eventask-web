/**
 * SeeAllPage Component Tests
 * Tests all UI states: Loading, Success, Empty, and Error
 */
import { describe, test, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse } from 'msw'
import { Route, Routes } from 'react-router-dom'

import { AUTH_STATUS } from '@/auth/constants/auth-status'

import { server } from '@/tests/mocks/server'
import { renderWithProviders } from '@/tests/utils/test-utils'
import { createFakeTasks } from '@/tests/mocks/factories/taskFactory'

import SeeAllPage from './SeeAllPage'

const authenticatedState = {
  auth: {
    status: AUTH_STATUS.AUTHENTICATED,
    accessToken: 'fake-token',
    currentUserId: 'fake-user-id',
  },
}

describe('SeeAllPage', () => {
  describe('Loading State', () => {
    test('shows skeleton loader while fetching data', async () => {
      server.use(
        http.get('*/api/tasks', async () => {
          await delay(500)
          return HttpResponse.json({
            items: [],
            total: 0,
            page: 1,
            perPage: 5,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          })
        })
      )

      renderWithProviders(
        <Routes>
          <Route path="/see-all" element={<SeeAllPage />} />
        </Routes>,
        {
          preloadedState: authenticatedState,
          initialRoute: '/see-all?type=tasks&page=1&perPage=5',
        }
      )

      // Skeleton should be present initially
      expect(await screen.findByRole('status', { name: /loading/i })).toBeInTheDocument()
    })
  })

  describe('Success State', () => {
    test('displays table with paginated tasks', async () => {
      // Default handler returns 50 tasks, we request page 1 with 5 per page
      renderWithProviders(
        <Routes>
          <Route path="/see-all" element={<SeeAllPage />} />
        </Routes>,
        { preloadedState: authenticatedState, initialRoute: '/see-all?type=tasks&page=1&perPage=5' }
      )

      // Wait until the condition is true (that it is NOT in the document)
      // Wait for data to load
      await waitFor(() => {
        expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument()
      })

      // Should show table rows (5 tasks data rows + 1 header row)
      const rows = screen.getAllByRole('row')
      expect(rows.length).toBe(6)

      // Should show pagination controls
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('displays correct task data from MSW handler', async () => {
      // Override handler with specific tasks
      const fakeTasks = createFakeTasks(3, {
        title: 'Test Task',
      })

      server.use(
        http.get('*/api/tasks', () => {
          return HttpResponse.json({
            items: fakeTasks,
            total: 3,
            page: 1,
            perPage: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          })
        })
      )

      renderWithProviders(
        <Routes>
          <Route path="/see-all" element={<SeeAllPage />} />
        </Routes>,
        { preloadedState: authenticatedState, initialRoute: '/see-all?type=tasks&page=1&perPage=5' }
      )

      // Wait for "Test Task" to appear (all 3 have this title)
      await waitFor(() => {
        const taskTitles = screen.getAllByText(/Test Task/i)
        expect(taskTitles.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Empty State', () => {
    test('shows empty message when no data is returned', async () => {
      // Override handler to return empty array
      server.use(
        http.get('*/api/tasks', () => {
          return HttpResponse.json({
            items: [],
            total: 0,
            page: 1,
            perPage: 10,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          })
        })
      )

      renderWithProviders(
        <Routes>
          <Route path="/see-all" element={<SeeAllPage />} />
        </Routes>,
        { preloadedState: authenticatedState, initialRoute: '/see-all?type=tasks&page=1&perPage=5' }
      )

      // Wait for empty state message
      await waitFor(() => {
        expect(screen.getByText(/No tasks found/i)).toBeInTheDocument()
      })

      // Should show "Go back Home" button
      expect(screen.getByRole('button', { name: /go back home/i })).toBeInTheDocument()

      // Empty state should have role="status" for accessibility
      const emptyState = screen.getByText(/No tasks found/i).closest('div')
      expect(emptyState).toHaveAttribute('role', 'status')
    })
  })

  describe('Error State', () => {
    test('shows error message when API fails', async () => {
      // Override handler to return 500 error
      server.use(
        http.get('*/api/tasks', () => {
          return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
        })
      )

      renderWithProviders(
        <Routes>
          <Route path="/see-all" element={<SeeAllPage />} />
        </Routes>,
        { preloadedState: authenticatedState, initialRoute: '/see-all?type=tasks&page=1&perPage=5' }
      )

      // Wait for error message
      await waitFor(() => {
        screen.debug()
        expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument()
      })

      // Should show "Retry" button
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()

      // Error state should have role="alert" for accessibility
      const errorState = screen.getByText(/Internal Server Error/i).closest('div')
      expect(errorState).toHaveAttribute('role', 'alert')
    })

    test('retry button triggers refetch', async () => {
      const user = userEvent.setup()

      // First request fails
      server.use(
        http.get('*/api/tasks', () => {
          return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
        })
      )

      renderWithProviders(
        <Routes>
          <Route path="/see-all" element={<SeeAllPage />} />
        </Routes>,
        { preloadedState: authenticatedState, initialRoute: '/see-all?type=tasks&page=1&perPage=5' }
      )

      // Wait for error and retry button
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
      })

      // Override handler to succeed on retry
      server.use(
        http.get('*/api/tasks', () => {
          const tasks = createFakeTasks(5)
          return HttpResponse.json({
            items: tasks,
            total: 5,
            page: 1,
            perPage: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          })
        })
      )

      // Click retry button
      const retryButton = screen.getByRole('button', { name: /retry/i })
      await user.click(retryButton)

      // Wait for data to load after retry
      await waitFor(() => {
        expect(screen.queryByText(/Failed to load data/i)).not.toBeInTheDocument()
      })

      // Table should be displayed
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })
})
