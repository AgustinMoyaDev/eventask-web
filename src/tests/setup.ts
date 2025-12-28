import { afterEach } from 'vitest'
import { beforeAll, afterAll } from 'vitest'

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
