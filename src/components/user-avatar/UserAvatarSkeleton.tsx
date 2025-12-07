import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './UserAvatar.module.css'

export const UserAvatarSkeleton = () => {
  return (
    <div className={styles.userAvatarWrapper}>
      <Skeleton className={clsx(styles.userAvatar, styles.md)} />
    </div>
  )
}
