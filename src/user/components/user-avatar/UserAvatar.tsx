import { useState, useMemo } from 'react'
import clsx from 'clsx'

import { UserAvatarProps } from './user-avatar-types'

import {
  ALLOWED_MIME_TYPES,
  buildImageUrl,
  MAX_FILE_SIZE,
  sanitizeImageUrl,
} from '@/helpers/buildImageUrl'

import { Loader } from '@/components/loaders/loader/Loader'

import styles from './UserAvatar.module.css'

/**
 * Reusable user avatar component with optional file upload functionality
 * Supports different sizes, fallback initials, automatic URL detection, and file validation
 * @param props - UserAvatarProps
 * @returns JSX.Element - User avatar with optional upload capability
 */
export const UserAvatar = ({
  imageUrl,
  imageType,
  firstName,
  lastName,
  size = 'sm',
  editable = false,
  loading = false,
  onFileChange,
  className,
  ariaLabel,
}: UserAvatarProps) => {
  const [fileError, setFileError] = useState<string>('')
  const [imageLoadError, setImageLoadError] = useState(false)

  /**
   * Generate user initials from first and last name
   */
  const initials = useMemo(() => {
    const firstInitial = firstName?.[0] || ''
    const lastInitial = lastName?.[0] || ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }, [firstName, lastName])

  /**
   * Process and sanitize image URL
   * 1. Build complete URL from relative/partial paths
   * 2. Sanitize against XSS attacks (validated by CodeQL)
   */
  const displayImage = useMemo(() => {
    if (!imageUrl || imageLoadError) return null

    const url = buildImageUrl(imageUrl)
    // Sanitize URL - returns safe string or null
    return sanitizeImageUrl(url, imageType)
  }, [imageUrl, imageType, imageLoadError])

  /**
   * Handle image load error - fallback to initials
   */
  const handleImageError = () => {
    setImageLoadError(true)
  }

  /**
   * Handle file selection with validation
   * @param e - File input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onFileChange) return

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setFileError('Only PNG, JPEG or WEBP files are allowed')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File must be less than 1 MB')
      return
    }

    // Clear errors and call handler
    setFileError('')
    // Reset image error when uploading new file
    setImageLoadError(false)
    onFileChange(file)
  }

  /**
   * Avatar content with conditional rendering based on loading/image state
   */
  const avatarContent = (
    <>
      {loading ? (
        <Loader />
      ) : displayImage && !imageLoadError ? (
        <img
          className={styles.userAvatarImage}
          src={displayImage}
          alt={`${firstName} ${lastName} avatar`}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={handleImageError}
        />
      ) : (
        <div className={styles.userAvatarInitials}>{initials}</div>
      )}
    </>
  )

  /**
   * Dynamic CSS classes based on props
   */
  const avatarClasses = clsx(
    styles.userAvatar,
    styles[size],
    editable && styles.userAvatarEditable,
    loading && styles.userAvatarLoading,
    className
  )

  // Editable avatar with file input
  if (editable) {
    return (
      <div className={styles.userAvatarWrapper}>
        <label className={avatarClasses} aria-label={ariaLabel ?? 'Upload profile picture'}>
          {avatarContent}
          <input
            className={styles.userAvatarInput}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
          />
        </label>
        {fileError && (
          <span className={styles.userAvatarError} role="alert">
            {fileError}
          </span>
        )}
      </div>
    )
  }

  // Read-only avatar
  return (
    <div className={avatarClasses} aria-label={ariaLabel ?? `${firstName} ${lastName} avatar`}>
      {avatarContent}
    </div>
  )
}
