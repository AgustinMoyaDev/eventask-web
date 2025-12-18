import { getEnvVariables } from './getEnvVariables'

export const MAX_FILE_SIZE = 1024 * 1024 // 1MB
export const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp']

/**
 * Strict regex pattern for validating data URL image sources
 * Ensures:
 * - Starts with 'data:image/' prefix
 * - Only allows safe image formats (png, jpeg, webp)
 * - Requires base64 encoding
 * - Contains only valid base64 characters [A-Za-z0-9+/=]
 * - Prevents XSS attacks via malicious data URLs or embedded scripts
 * @example
 * Valid:
 * 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...'
 * Invalid (rejected):
 * 'data:text/html,<script>alert(1)</script>'
 * 'data:image/svg+xml,<svg onload="alert(1)"></svg>'
 */
export const DATA_URL_IMAGE_PATTERN = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/

/**
 * Build complete image URL from relative path or return as-is if already complete
 * @param imagePath - Image path from backend (relative) or complete URL
 * @returns Complete image URL ready for src attribute
 */
export const buildImageUrl = (imagePath: string): string => {
  const { VITE_API_URL } = getEnvVariables()

  // Return empty string for falsy values
  if (!imagePath) return ''

  // Return as-is if already a complete URL (http/https) or blob URL
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('blob:')
  ) {
    return imagePath
  }
  // Build complete URL for relative paths starting with /uploads
  if (imagePath.startsWith('/uploads')) {
    return `${VITE_API_URL}${imagePath}`
  }

  // Handle data URLs and other edge cases
  if (imagePath.startsWith('data:')) return imagePath

  console.warn(`Unexpected image path format: ${imagePath}`)
  return imagePath
}

/**
 * Sanitize and validate image URL for safe use in img src attribute
 * Returns sanitized URL or null if unsafe
 * @param url - URL to sanitize (from buildImageUrl)
 * @param mimeType - MIME type for blob URL validation (from validated file upload)
 * @returns Sanitized URL string or null if invalid/unsafe
 */
export const sanitizeImageUrl = (url: string, mimeType?: string): string | null => {
  if (!url) return null

  try {
    const parsedUrl = new URL(url, window.location.origin)
    const protocol = parsedUrl.protocol

    // codeql[js/incomplete-url-scheme-check] Allowlist validation for image sources
    // 1. Server URLs - safe with proper CSP headers
    if (protocol === 'http:' || protocol === 'https:') {
      // Return normalized URL (prevents double-encoding attacks)
      return parsedUrl.href
    }

    // 2. Blob URLs - only from validated file uploads
    if (protocol === 'blob:') {
      // Require explicit MIME type from validated file (see handleFileChange)
      if (mimeType && ALLOWED_MIME_TYPES.includes(mimeType)) {
        return parsedUrl.href
      }
      return null
    }

    // 3. Data URLs - strict validation for image-only base64
    if (protocol === 'data:') {
      // Validate against strict pattern (prevents XSS via malicious data URLs)
      if (DATA_URL_IMAGE_PATTERN.test(url)) {
        return url
      }
      return null
    }

    // Reject all other protocols (javascript:, vbscript:, file:, etc.)
    return null
  } catch {
    // Malformed URLs are unsafe by default
    return null
  }
}
