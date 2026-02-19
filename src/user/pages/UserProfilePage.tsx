import { clsx } from 'clsx'

import { useUserProfileQueries } from '@/user/store/hooks/useUserProfileQueries'

import { useFirstTimeUser } from '@/components/welcome-onboarding/useFirstTimeUser'
import { Button } from '@/components/button/Button'
import { CheckIcon, ErrorIcon } from '@/components/icons/Icons'

import { EditProfileForm } from '../components/profile-form/ProfileForm'
import UserProfilePageSkeleton from './UserProfilePageSkeleton'

import styles from './UserProfilePage.module.css'

const UserProfilePage = () => {
  const { user, fetchingProfile } = useUserProfileQueries()
  const { showWelcome, resetWelcome } = useFirstTimeUser()

  if (fetchingProfile || !user) return <UserProfilePageSkeleton />

  return (
    <section className={clsx(styles.userProfile, 'section')}>
      <div className={styles.userProfileResetOnboardingContainer}>
        <Button className={styles.userProfileResetOnboardingBtn} onClick={resetWelcome}>
          Reset onboarding
          {showWelcome ? <CheckIcon /> : <ErrorIcon />}
        </Button>
      </div>

      <EditProfileForm />
    </section>
  )
}

export default UserProfilePage
