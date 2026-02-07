import { useProfileForm } from '@/user/components/profile-form/useProfileForm'

import { UserAvatar } from '@/components/user-avatar/UserAvatar'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'

import { SecuritySettings } from '@/user/components/security-settings/SecuritySettings'

import { IUser } from '@/types/IUser'

import styles from './ProfileForm.module.css'

export const EditProfileForm = () => {
  const {
    user,
    isSaving,
    isUploadingAvatar,
    displayBackendError,

    // Form (RHF)
    register,
    formErrors,
    isFormValid,
    hasChanges,
    handleSubmit,

    // Actions
    handleAvatarChange,
    handleInviteContact,
    isInviting,
    inviteError,
  } = useProfileForm()

  if (!user) return null

  return (
    <form
      className={styles.userProfileForm}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Edit user profile"
    >
      {displayBackendError && (
        <p className={styles.userProfileFormBackendError} role="alert" aria-live="polite">
          {displayBackendError}
        </p>
      )}

      <header className={styles.userProfileFormHeader}>
        <h2 className={styles.userProfileFormTitle}>Profile: {user.firstName}</h2>

        <UserAvatar
          className={styles.userProfileFormAvatar}
          userId={user.id.toString()}
          imageUrl={user.profileImageURL}
          firstName={user.firstName}
          lastName={user.lastName}
          size="lg"
          editable
          loading={isUploadingAvatar}
          onFileChange={handleAvatarChange}
          ariaLabel="Upload profile picture"
        />
      </header>

      <Input label="Email" {...register('email')} disabled />

      <Input
        label="First Name"
        required
        {...register('firstName')}
        error={formErrors.firstName?.message}
      />

      <Input
        label="Last Name"
        required
        {...register('lastName')}
        error={formErrors.lastName?.message}
      />

      <MultiSelectInput<IUser>
        label="Contacts"
        typeOption="email"
        options={user.contacts ?? []}
        actionOnEmpty
        actionLabel="Invite"
        actionMethod={handleInviteContact}
        loading={isInviting}
        error={inviteError?.fieldsValidations?.email ?? inviteError?.message}
        getOptionLabel={contact => contact.email}
        getOptionKey={contact => contact.id}
      />

      <SecuritySettings user={user} />

      <footer className={styles.userProfileFormFooter}>
        <Button
          className={styles.userProfileFormSubmitBtn}
          type="submit"
          variant="filled"
          disabled={!hasChanges || !isFormValid || isSaving}
          aria-busy={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save changes'}
        </Button>

        <ButtonLink variant="outlined" className={styles.userProfileFormHomeBtn} to="/home">
          Go home
        </ButtonLink>
      </footer>
    </form>
  )
}
