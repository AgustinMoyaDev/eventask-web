import clsx from 'clsx'

import { Skeleton } from '@/components/skeletons/Skeleton'

import { EditProfileFormSkeleton } from '../components/profile-form/ProfileFormSkeleton'

import styles from './UserProfilePage.module.css'

const UserProfilePageSkeleton = () => {
  return (
    <section className={clsx(styles.userProfile, 'section')}>
      <Skeleton className={styles.userProfileResetOnboardingBtn} width="11rem" height="2.75rem" />

      <EditProfileFormSkeleton />
    </section>
  )
}

export default UserProfilePageSkeleton
