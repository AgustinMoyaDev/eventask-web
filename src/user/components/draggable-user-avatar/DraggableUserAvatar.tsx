import { DraggableUserAvatarProps } from './draggable-user-avatar.types'

import { UserAvatar } from '@/user/components/user-avatar/UserAvatar'
import { Draggable } from '@/components/drag-n-drop/draggable/Draggable'

/**
 * Draggable User Avatar component
 * - Combines Draggable wrapper with UserAvatar content
 * - Provides consistent participant drag data
 * - Reusable across different avatar contexts
 * - Styles centralized in -> './Draggable.css'
 */
export const DraggableUserAvatar = ({
  data,
  size = 'sm',
  className,
  disabled = false,
}: DraggableUserAvatarProps) => {
  const { imageUrl, firstName, lastName, id } = data
  return (
    <Draggable data={data} className={className} disabled={disabled}>
      <UserAvatar
        userId={id!.toString()}
        imageUrl={imageUrl}
        firstName={firstName}
        lastName={lastName}
        size={size}
        ariaLabel={`${firstName} ${lastName} avatar`}
      />
    </Draggable>
  )
}
