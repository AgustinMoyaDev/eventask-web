/**
 * MSW Server Setup for Node.js (Vitest)
 * @see https://mswjs.io/docs/integrations/node
 */
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/**
 * Configure MSW server with request handlers.
 * This server will intercept HTTP requests during tests.
 */
export const server = setupServer(...handlers)
