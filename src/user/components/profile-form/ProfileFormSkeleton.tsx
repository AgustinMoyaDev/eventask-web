import { Skeleton } from '@/components/skeletons/Skeleton'
import { UserAvatarSkeleton } from '@/user/components/user-avatar/UserAvatarSkeleton'

import styles from './ProfileForm.module.css'

export const EditProfileFormSkeleton = () => {
  return (
    <div className={styles.userProfileForm}>
      <header className={styles.userProfileFormHeader}>
        <Skeleton width="10rem" height="1.5rem" />
        <UserAvatarSkeleton />
      </header>

      {/* Email */}
      <Skeleton width="100%" height="4rem" />
      {/* First Name */}
      <Skeleton width="100%" height="4rem" />
      {/* Last Name */}
      <Skeleton width="100%" height="4rem" />
      {/* Contacts */}
      <Skeleton width="100%" height="8.75rem" />
      {/* Security Settings */}
      <Skeleton width="100%" height="10rem" />

      <footer className={styles.userProfileFormFooter}>
        <Skeleton className={styles.userProfileFormSubmitBtn} width="7rem" height="2.25rem" />
        <Skeleton className={styles.userProfileFormHomeBtn} width="7rem" height="2.25rem" />
      </footer>
    </div>
  )
}
