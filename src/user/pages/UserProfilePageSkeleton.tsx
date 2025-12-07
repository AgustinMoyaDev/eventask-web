import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'
import { UserAvatarSkeleton } from '@/components/user-avatar/UserAvatarSkeleton'

import styles from './UserProfilePage.module.css'

const UserProfilePageSkeleton = () => {
  return (
    <section className={clsx(styles.userProfile, 'section')}>
      <Skeleton className={styles.userProfileResetOnboardingBtn} width="11rem" height="2.75rem" />
      <div className={styles.userProfileForm} style={{ gap: '2.5rem' }}>
        <header className={styles.userProfileFormHeader} style={{ marginTop: '28px' }}>
          <Skeleton className={styles.userProfileFormTitle} width="10rem" height="1.5rem" />
          <UserAvatarSkeleton />
        </header>

        <Skeleton width="100%" height="4rem" />
        <Skeleton width="100%" height="4rem" />
        <Skeleton width="100%" height="4rem" />
        <Skeleton width="100%" height="8.75rem" />

        <footer className={styles.userProfileFormFooter}>
          <Skeleton className={styles.userProfileFormSubmitBtn} width="7rem" height="2.25rem" />
          <Skeleton className={styles.userProfileFormHomeBtn} width="7rem" height="2.25rem" />
        </footer>
      </div>
    </section>
  )
}

export default UserProfilePageSkeleton
