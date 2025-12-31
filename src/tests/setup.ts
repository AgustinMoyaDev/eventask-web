import { afterEach, beforeAll, afterAll, vi } from 'vitest'

// Mock environment variables to ensure consistent API URL in tests (CI fix)
vi.mock('@/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({
    VITE_API_URL: 'http://localhost:4000/api',
    DEV: false,
  }),
}))

import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import { server } from './mocks/server'

/**
 * Setup MSW server for all tests.
 * @see https://mswjs.io/docs/integrations/node
 */
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' })
})

// Extends jest-dom assertions
afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
