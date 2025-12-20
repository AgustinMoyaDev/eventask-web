import { IUser } from '@/types/IUser'
import { DraggableUserAvatar } from '../draggable-user-avatar/DraggableUserAvatar'
import { UserAvatar } from '../user-avatar/UserAvatar'
import { DraggableData } from '@/types/ui/dragNdrop'

interface AvatarProps {
  user: IUser
  draggable?: DraggableData
}

export const AvatarComponent = ({ user, draggable }: AvatarProps) => {
  const { id, profileImageURL, firstName, lastName } = user
  const commonProps = {
    imageUrl: profileImageURL,
    firstName,
    lastName,
  }

  return draggable ? (
    <DraggableUserAvatar
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
      className="avatar"
      ariaLabel={`${firstName} ${lastName} avatar`}
      {...commonProps}
    />
  )
}
