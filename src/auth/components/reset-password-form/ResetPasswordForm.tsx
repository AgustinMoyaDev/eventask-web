import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'
import { ButtonLink } from '@/components/button-link/ButtonLink'

import { useResetPasswordForm } from './useResetPasswordForm'

import styles from './ResetPasswordForm.module.css'

interface ResetPasswordFormProps {
  /**
   * The security token extracted from the URL query parameters.
   */
  token: string

  /**
   * Callback invoked immediately after the password has been successfully changed.
   */
  onSuccess: () => void
}

export const ResetPasswordForm = ({ token, onSuccess }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    isFormValid: isValid,
    resetPasswordLoading,
    resetPasswordAuthError,
  } = useResetPasswordForm(token, onSuccess)

  const displayBackendError = resetPasswordAuthError?.message

  return (
    <div className={styles.formContainer}>
      {displayBackendError && (
        <p className={styles.resetPasswordError} role="alert" aria-live="polite">
          {displayBackendError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          type="password"
          label="New password"
          required
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message ?? resetPasswordAuthError?.fieldsValidations?.newPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />

        <Input
          type="password"
          label="Repeat password"
          required
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />

        <div className={styles.resetPasswordActions}>
          <ButtonLink variant="outlined" to="/auth/login">
            Go back to log in
          </ButtonLink>

          <Button
            type="submit"
            disabled={!isValid || resetPasswordLoading}
            aria-busy={resetPasswordLoading}
            {...(resetPasswordLoading && { 'aria-label': 'Changing password' })}
          >
            {resetPasswordLoading ? <Loader text="Loading" /> : 'Change password'}
          </Button>
        </div>
      </form>
    </div>
  )
}
