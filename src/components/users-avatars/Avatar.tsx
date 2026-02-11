import { User } from '@/types/entities/user'
import { DraggableUserAvatar } from '../draggable-user-avatar/DraggableUserAvatar'
import { UserAvatar } from '../user-avatar/UserAvatar'
import { DraggableData } from '@/types/ui/dragNdrop'

interface AvatarProps {
  user: User
  draggable?: DraggableData
  className?: string
}

export const Avatar = ({ user, draggable, className }: AvatarProps) => {
  const { id, profileImageURL, firstName, lastName } = user
  const commonProps = {
    imageUrl: profileImageURL,
    firstName,
    lastName,
  }

  return draggable ? (
    <DraggableUserAvatar
      className={className}
      data={{
        id,
        type: draggable.type,
        originId: draggable.originId,
        originName: draggable.originName,
        ...commonProps,
      }}
    />
  ) : (
    <UserAvatar
      userId={id.toString()}
      className={className}
      ariaLabel={`${firstName} ${lastName} avatar`}
      {...commonProps}
    />
  )
}
