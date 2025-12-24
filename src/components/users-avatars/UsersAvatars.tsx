import clsx from 'clsx'

import { UsersAvatarsProps } from '@/types/ui/user-avatar'

import { Avatar } from './Avatar'

import styles from './UsersAvatars.module.css'

export const UsersAvatars = ({ users = [], className = '', draggable }: UsersAvatarsProps) => {
  return (
    <section className={clsx(styles.avatars, className)}>
      {users.slice(0, 3).map(user => (
        <Avatar key={user.id} user={user} draggable={draggable} />
      ))}

      {users.length > 3 && (
        <span className={clsx(styles.avatar, styles.avatarMore)}>+{users.length - 3}</span>
      )}
    </section>
  )
}
