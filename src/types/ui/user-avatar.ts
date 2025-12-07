import { IUser } from '../IUser'
import { DraggableData } from './dragNdrop'
import { Size } from './size'

export interface UserAvatarProps {
  /** User ID */
  userId?: string
  /** User's profile image URL (server path or blob URL) */
  imageUrl?: string
  /** User's first name for initials fallback */
  firstName: string
  /** User's last name for initials fallback */
  lastName: string
  /** Size variant of the avatar */
  size?: Size
  /** Whether the avatar is clickable (for file upload) */
  editable?: boolean
  /** Loading state for upload operations */
  loading?: boolean
  /** Additional CSS classes */
  className?: string
  /** Accessibility label */
  ariaLabel?: string
  /** File change handler for editable avatars */
  onFileChange?: (file: File) => void
}

export interface UsersAvatarsProps {
  users: IUser[]
  className?: string
  draggable?: DraggableData
}
