/**
 * MSW Request Handlers
 * @see https://mswjs.io/docs/basics/request-handler
 */
import { http } from 'msw'

/**
 * Array of request handlers for MSW.
 * Add API endpoint handlers here.
 */
export const handlers: ReturnType<typeof http.get>[] = []
