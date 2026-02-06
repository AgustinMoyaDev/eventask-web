import { ButtonLink } from '@/components/button-link/ButtonLink'
import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { Loader } from '@/components/loaders/loader/Loader'

import { useForgotPasswordForm } from './useForgotPasswordForm'

import styles from './ForgotPasswordForm.module.css'

interface ForgotPasswordFormProps {
  /**
   * Callback invoked immediately after the password reset email
   * has been successfully requested to the API.
   */
  onSuccess: () => void
}

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    isFormValid,
    forgotPasswordLoading,
    forgotPasswordAuthError,
  } = useForgotPasswordForm(onSuccess)

  return (
    <div className={styles.formContainer}>
      <p className={styles.forgotPasswordError} role="alert" aria-live="polite">
        {forgotPasswordAuthError?.message}
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          required
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message ?? forgotPasswordAuthError?.fieldsValidations?.email}
        />

        <div className={styles.forgotPasswordActions}>
          <ButtonLink variant="outlined" to="/auth/login">
            Go back to log in
          </ButtonLink>

          <Button
            type="submit"
            disabled={!isFormValid || forgotPasswordLoading}
            aria-busy={forgotPasswordLoading}
            {...(forgotPasswordLoading && { 'aria-label': 'Sending recovery email' })}
          >
            {forgotPasswordLoading ? <Loader text="Sending" /> : 'Send email'}
          </Button>
        </div>
      </form>
    </div>
  )
}
