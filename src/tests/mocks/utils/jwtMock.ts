/**
 * JWT Mock Token Generator
 * Creates fake JWT tokens that mimic real structure for demo mode
 * @see https://jwt.io/introduction
 *
 * Note: These are NOT cryptographically secure tokens.
 * They only simulate the structure for frontend demo purposes.
 */

interface JWTPayload {
  sub: string // Subject (user ID)
  iat: number // Issued at (timestamp)
  exp: number // Expiration (timestamp)
}

/**
 * Encodes object to Base64 URL-safe string (JWT-like)
 * @param obj - Object to encode
 * @returns Base64 encoded string
 */
function base64UrlEncode(obj: object): string {
  const jsonString = JSON.stringify(obj)
  const base64 = btoa(jsonString)

  // Convert to URL-safe format:
  // URL-safe (without +, /, =)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Generates a mock JWT token
 * @param userId - User ID for the token
 * @param email - User email
 * @param name - User full name
 * @param expiresInHours - Token validity in hours (default: 24h)
 * @returns Fake JWT token string
 *
 * @example
 * ```typescript
 * const token = generateMockJWT('user-123', 'demo@eventask.com', 'Demo User')
 * // Returns: "eyJhbGci...encoded-header.eyJzdWIi...encoded-payload.mock-signature"
 * ```
 */
export function generateMockJWT(userId: string, expiresInHours = 24): string {
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = now + expiresInHours * 60 * 60

  // JWT Header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  // JWT Payload
  const payload: JWTPayload = {
    sub: userId,
    iat: now,
    exp: expiresAt,
  }

  // Encode header and payload
  const encodedHeader = base64UrlEncode(header)
  const encodedPayload = base64UrlEncode(payload)

  const mockSignature = 'mock-signature-for-demo-mode'

  return `${encodedHeader}.${encodedPayload}.${mockSignature}`
}

/**
 * Decodes a mock JWT token (for debugging/testing)
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function decodeMockJWT(token: string): JWTPayload | null {
  try {
    const [, payloadBase64] = token.split('.')
    if (!payloadBase64) return null

    // Restore padding
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/')

    const jsonString = atob(base64)
    return JSON.parse(jsonString) as JWTPayload
  } catch {
    return null
  }
}
