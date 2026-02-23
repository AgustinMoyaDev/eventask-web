import { User } from '@/types/entities/user'

/**
 * Draggable configuration for user avatar list
 * Contains origin metadata for drag operations
 */
export interface UserAvatarDraggableConfig {
  type: string
  originId: string | number
  originName: string
}

export interface UsersAvatarsProps {
  users: User[]
  className?: string
  draggable?: UserAvatarDraggableConfig
  collapsed?: boolean
}
