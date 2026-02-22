export type UserAvatarSize = 'sm' | 'md' | 'lg'

export interface UserAvatarProps {
  userId?: string
  imageUrl?: string
  imageType?: string
  firstName: string
  lastName: string
  size?: UserAvatarSize
  editable?: boolean
  loading?: boolean
  className?: string
  ariaLabel?: string
  onFileChange?: (file: File) => void
}
