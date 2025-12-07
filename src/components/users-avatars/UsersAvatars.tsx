import clsx from 'clsx'

import { UsersAvatarsProps } from '@/types/ui/user-avatar'
import { IUser } from '@/types/IUser'

import { DraggableUserAvatar } from '@/components/draggable-user-avatar/DraggableUserAvatar'
import { UserAvatar } from '@/components/user-avatar/UserAvatar'

import styles from './UsersAvatars.module.css'

export const UsersAvatars = ({ users = [], className = '', draggable }: UsersAvatarsProps) => {
  const AvatarComponent = ({ user }: { user: IUser }) => {
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

  return (
    <section className={clsx(styles.avatars, className)}>
      {users.slice(0, 3).map(user => (
        <AvatarComponent key={user.id} user={user} />
      ))}

      {users.length > 3 && (
        <span className={clsx(styles.avatar, styles.avatarMore)}>+{users.length - 3}</span>
      )}
    </section>
  )
}
