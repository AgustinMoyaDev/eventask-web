/**
 * Delay utility for simulating network latency in MSW handlers
 * Useful for testing loading states, skeletons, and spinners
 * @see https://mswjs.io/docs/api/delay
 */

/**
 * Delay presets for common scenarios
 */
export const DELAYS = {
  FAST: 200, // Quick operations (delete, update)
  NORMAL: 500, // Standard operations (fetch, create)
  SLOW: 1000, // Slow operations (file upload, heavy queries)
  VERY_SLOW: 2000, // Extremely slow (simulating cold start)
} as const
