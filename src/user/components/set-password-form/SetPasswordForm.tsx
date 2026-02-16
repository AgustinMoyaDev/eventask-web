import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'

import { useSetPasswordForm } from './useSetPasswordForm'

import styles from './SetPasswordForm.module.css'

export const SetPasswordForm = () => {
  const { register, formErrors, isFormValid, setPasswordLoading, setPasswordError, handleSubmit } =
    useSetPasswordForm()

  const displayBackendError = setPasswordError?.message

  return (
    <div className={styles.setPasswordContainer}>
      <h3 className={styles.setPasswordTitle}>Add Manual Password</h3>
      {displayBackendError && (
        <p className={styles.setPasswordFormBackendError} role="alert">
          {displayBackendError}
        </p>
      )}

      <p className={styles.setPasswordDescription}>
        Add a password to enable email and password login as a backup method.
      </p>

      <form className={styles.setPasswordForm} onSubmit={handleSubmit}>
        <Input
          type="password"
          label="New Password"
          required
          autoFocus
          autoComplete="new-password"
          {...register('newPassword')}
          error={formErrors.newPassword?.message ?? setPasswordError?.fieldErrors?.newPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />

        <Input
          type="password"
          label="Confirm password"
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
          disabled={!isFormValid || setPasswordLoading}
          aria-busy={setPasswordLoading}
          {...(setPasswordLoading && { 'aria-label': 'Setting password' })}
        >
          {setPasswordLoading ? <Loader text="Setting..." /> : 'Set Password'}
        </Button>
      </form>
    </div>
  )
}
