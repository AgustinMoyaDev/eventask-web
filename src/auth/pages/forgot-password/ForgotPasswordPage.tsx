import { useState } from 'react'

import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { ButtonLink } from '@/components/button-link/ButtonLink'
import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'

import {
  forgotPasswordFields,
  forgotPasswordFormValidations,
} from '@/helpers/form-validations/getForgotPasswordFormValidations'

import { useAuthActions } from '@/store/hooks/useAuthActions'
import { useForm } from '@/hooks/useForm'

import styles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false)
  const titleForm = emailSent
    ? `We've sent you an email with instructions on how to reset your password`
    : 'Enter your email to receive recovery instructions'

  const subtitleForm = emailSent
    ? `Check your inbox for the recovery email. You can close this tab.`
    : undefined

  const { forgotPasswordLoading, forgotPassword, forgotPasswordAuthError } = useAuthActions()

  const { email, emailValid, isFormValid, touchedFields, onInputChange, onBlurField } = useForm(
    forgotPasswordFields,
    forgotPasswordFormValidations
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    const result = await forgotPassword({ email })
    if (!result?.error) setEmailSent(true)
  }

  return (
    <section className={styles.container}>
      <AuthHeaderForm title={titleForm} subtitle={subtitleForm} />

      {!emailSent && (
        <div className={styles.formContainer}>
          <p className={styles.forgotPasswordError}>{forgotPasswordAuthError?.message}</p>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email"
              required
              value={email}
              onChange={onInputChange}
              error={emailValid ?? forgotPasswordAuthError?.fieldsValidations?.email}
              onBlur={() => onBlurField('email')}
              touched={touchedFields.email}
            />
            <div className={styles.forgotPasswordActions}>
              <ButtonLink variant="outlined" to="/auth/login">
                Go back to log in
              </ButtonLink>
              {!emailSent && (
                <Button type="submit" disabled={!isFormValid || forgotPasswordLoading}>
                  {forgotPasswordLoading ? 'Sending...' : 'Send email'}
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
      {emailSent && (
        <ButtonLink variant="tonal" to="/auth/login">
          Go back to log in
        </ButtonLink>
      )}
    </section>
  )
}

export default ForgotPasswordPage
