import clsx from 'clsx'

import { UsersAvatarsProps } from './user-avatar-list.types'

import { DraggableUserAvatar } from '../draggable-user-avatar/DraggableUserAvatar'
import { UserAvatar } from '../user-avatar/UserAvatar'

import styles from './UserAvatarList.module.css'

export const UserAvatarList = ({
  users = [],
  className = '',
  draggable,
  collapsed = true,
}: UsersAvatarsProps) => {
  const MAX_VISIBLE_AVATARS = 3
  const visibleUsers = collapsed ? users.slice(0, MAX_VISIBLE_AVATARS) : users

  const remainingCount = users.length - MAX_VISIBLE_AVATARS
  const showCounter = collapsed && remainingCount > 0

  return (
    <section className={clsx(styles.avatars, className)}>
      {visibleUsers.map(user => {
        const { id, profileImageURL, firstName, lastName } = user

        return draggable ? (
          <DraggableUserAvatar
            key={id}
            className={styles.avatar}
            data={{
              id,
              type: draggable.type,
              originId: draggable.originId,
              originName: draggable.originName,
              imageUrl: profileImageURL,
              firstName,
              lastName,
            }}
          />
        ) : (
          <UserAvatar
            key={id}
            userId={id.toString()}
            className={styles.avatar}
            imageUrl={profileImageURL}
            firstName={firstName}
            lastName={lastName}
            ariaLabel={`${firstName} ${lastName} avatar`}
          />
        )
      })}

      {showCounter && (
        <span className={clsx(styles.avatar, styles.avatarMore)}>+{remainingCount}</span>
      )}
    </section>
  )
}
