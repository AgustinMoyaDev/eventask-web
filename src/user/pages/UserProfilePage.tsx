import { useEffect, useMemo, useRef, useState } from 'react'
import deepEqual from 'fast-deep-equal'
import { clsx } from 'clsx'

import { useUserActions } from '@/store/hooks/useUserActions'
import { useForm } from '@/hooks/useForm'
import { useInvitationActions } from '@/store/hooks/useInvitationActions'
import {
  userFormFields,
  userFormValidations,
} from '@/helpers/form-validations/getUserFormValidations'

import { IUpdateUserDto } from '@/types/dtos/user'
import { IUserForm, IUser } from '@/types/IUser'

import { UserAvatar } from '@/components/user-avatar/UserAvatar'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'
import { CheckIcon, ErrorIcon } from '@/components/icons/Icons'
import { useFirstTimeUser } from '@/components/welcome-onboarding/useFirstTimeUser'
import { SecuritySettings } from '../components/security-settings/SecuritySettings'
import UserProfilePageSkeleton from './UserProfilePageSkeleton'

import styles from './UserProfilePage.module.css'

/**
 * User profile page component for editing user information and avatar
 * Features: profile data editing, avatar upload, form validation, error handling
 * @returns JSX.Element - User profile form with avatar upload
 */
const UserProfilePage = () => {
  const { showWelcome, resetWelcome } = useFirstTimeUser()
  const originalFormRef = useRef<IUserForm | null>(null)

  const {
    user,
    fetchingProfile,
    updatingProfile,
    uploadingAvatar,
    updateProfile,
    uploadAvatar,
    fetchUserError,
    updateUserError,
    uploadUserAvatarError,
  } = useUserActions()

  const { inviteContact, inviting, inviteContactError } = useInvitationActions()

  const {
    formState: { firstName, lastName, email, profileImageURL },
    firstNameValid,
    lastNameValid,
    touchedFields,
    isFormValid,
    formState,
    setFormState,
    onInputChange,
    onBlurField,
  } = useForm<IUserForm>(userFormFields, userFormValidations)

  // Local state for file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  const formHasChanges = useMemo(() => {
    if (!originalFormRef.current) return false

    const hasFormChanges = !deepEqual(formState, originalFormRef.current)

    return hasFormChanges || selectedFile !== null
  }, [formState, selectedFile])

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  useEffect(() => {
    if (user) {
      const { email, firstName, lastName, profileImageURL, contacts = [] } = user
      setFormState({
        email,
        firstName,
        lastName,
        profileImageURL,
        contacts,
      })
      setPreview(profileImageURL)

      originalFormRef.current = {
        email,
        firstName,
        lastName,
        profileImageURL,
        contacts,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   * Handle file selection for avatar upload
   * @param file - Selected file from UserAvatar component
   */
  const handleFileChange = (file: File) => {
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const sendEmailInvitation = (email: string) => {
    inviteContact({ email })
  }

  /**
   * Handle form submission with avatar upload and profile update
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formHasChanges && !selectedFile) return
    if (formHasChanges && !isFormValid) return

    let avatarUrl = profileImageURL

    // Upload avatar if file is selected
    if (selectedFile) {
      const formData = new FormData()
      formData.append('avatar', selectedFile)
      const uploadResult = await uploadAvatar(formData)

      if (uploadResult.data?.profileImageURL) {
        avatarUrl = uploadResult.data.profileImageURL
        // Update preview immediately with server URL
        setPreview(avatarUrl)
      }
    }

    // Update profile with new data
    const userPayload: IUpdateUserDto = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      profileImageURL: avatarUrl,
    }

    await updateProfile(userPayload)

    // Clear selected file after successful update
    setSelectedFile(null)
  }

  if (fetchingProfile || !user) return <UserProfilePageSkeleton />

  // Allow submit if form is valid OR only changing avatar
  const isSubmitDisabled =
    (!formHasChanges && !selectedFile) ||
    (formHasChanges && !isFormValid) ||
    updatingProfile ||
    uploadingAvatar

  const displayError =
    fetchUserError?.message || updateUserError?.message || uploadUserAvatarError?.message

  return (
    <section className={clsx(styles.userProfile, 'section')}>
      <div className={styles.userProfileResetOnboardingContainer}>
        <Button className={styles.userProfileResetOnboardingBtn} onClick={resetWelcome}>
          Reset onboarding
          {showWelcome ? <CheckIcon /> : <ErrorIcon />}
        </Button>
      </div>
      <form
        className={styles.userProfileForm}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <p className={styles.userProfileFormBackendError} role="alert">
          {displayError}
        </p>
        <header className={styles.userProfileFormHeader}>
          <h2 className={styles.userProfileFormTitle}>Profile: {firstName}</h2>

          <UserAvatar
            className={styles.userProfileFormAvatar}
            userId={user?.id.toString()}
            imageUrl={preview || user?.profileImageURL}
            firstName={firstName}
            lastName={lastName}
            size="lg"
            editable
            loading={uploadingAvatar}
            onFileChange={handleFileChange}
            ariaLabel="Upload profile picture"
          />
        </header>

        <Input label="Email" name="email" value={email} required disabled />

        <Input
          label="First Name"
          name="firstName"
          value={firstName}
          required
          onChange={onInputChange}
          onBlur={() => onBlurField('firstName')}
          touched={touchedFields.firstName}
          error={firstNameValid}
        />

        <Input
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={onInputChange}
          required
          onBlur={() => onBlurField('lastName')}
          touched={touchedFields.lastName}
          error={lastNameValid}
        />

        <MultiSelectInput<IUser>
          label="Contacts"
          typeOption="email"
          options={user?.contacts || []}
          actionOnEmpty
          actionLabel="Invite"
          actionMethod={sendEmailInvitation}
          loading={inviting}
          error={inviteContactError?.fieldsValidations?.email ?? inviteContactError?.message}
          getOptionLabel={(user: IUser) => user.email}
          getOptionKey={(user: IUser) => user.id}
        />

        <SecuritySettings user={user} />

        <footer className={styles.userProfileFormFooter}>
          <Button
            className={styles.userProfileFormSubmitBtn}
            type="submit"
            variant="filled"
            disabled={isSubmitDisabled}
          >
            {updatingProfile || uploadingAvatar ? 'Saving…' : 'Save changes'}
          </Button>

          <ButtonLink variant="outlined" className={styles.userProfileFormHomeBtn} to="/home">
            Go home
          </ButtonLink>
        </footer>
      </form>
    </section>
  )
}

export default UserProfilePage
