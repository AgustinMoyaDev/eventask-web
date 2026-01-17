import clsx from 'clsx'

import { UsersAvatarsProps } from '@/types/ui/user-avatar'

import { Avatar } from './Avatar'

import styles from './UsersAvatars.module.css'

export const UsersAvatars = ({
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
      {visibleUsers.map(user => (
        <Avatar key={user.id} className={styles.avatar} user={user} draggable={draggable} />
      ))}

      {showCounter && (
        <span className={clsx(styles.avatar, styles.avatarMore)}>+{remainingCount}</span>
      )}
    </section>
  )
}
