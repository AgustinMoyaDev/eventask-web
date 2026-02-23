import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'

import { useChangePasswordForm } from './useChangePasswordForm'

import styles from './ChangePasswordForm.module.css'

export const ChangePasswordForm = () => {
  const {
    register,
    formErrors,
    isFormValid,
    changePasswordLoading,
    changePasswordError,
    handleSubmit,
  } = useChangePasswordForm()

  const displayBackendError = changePasswordError?.message

  return (
    <div className={styles.changePasswordContainer}>
      <h3 className={styles.changePasswordTitle}>Change Manual Password</h3>
      {displayBackendError && (
        <p className={styles.changePasswordFormBackendError} role="alert" aria-live="polite">
          {displayBackendError}
        </p>
      )}

      <p className={styles.changePasswordDescription}>
        Change your password to log in using email and password as a backup method.
      </p>

      <form className={styles.changePasswordForm} onSubmit={handleSubmit}>
        <Input
          autoFocus
          type="password"
          label="Current Password"
          required
          autoComplete="current-password"
          {...register('currentPassword')}
          error={
            formErrors.currentPassword?.message ?? changePasswordError?.fieldErrors?.currentPassword
          }
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
        <Input
          type="password"
          label="New Password"
          required
          autoComplete="new-password"
          {...register('newPassword')}
          error={formErrors.newPassword?.message ?? changePasswordError?.fieldErrors?.newPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
        <Input
          type="password"
          label="Repeat password"
          required
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={formErrors.confirmPassword?.message}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />

        <Button
          className={styles.setPasswordButton}
          type="submit"
          disabled={!isFormValid || changePasswordLoading}
          aria-busy={changePasswordLoading}
          {...(changePasswordLoading && { 'aria-label': 'Changing password' })}
        >
          {changePasswordLoading ? <Loader text="Changing" /> : 'Change Password'}
        </Button>
      </form>
    </div>
  )
}
