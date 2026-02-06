import { useState } from 'react'

import { ButtonLink } from '@/components/button-link/ButtonLink'
import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'
import { ForgotPasswordForm } from '@/auth/components/forgot-password-form/ForgotPasswordForm'

import styles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false)
  const titleForm = emailSent
    ? `We've sent you an email with instructions on how to reset your password`
    : 'Enter your email to receive recovery instructions'

  const subtitleForm = emailSent
    ? `Check your inbox for the recovery email. You can close this tab.`
    : null

  return (
    <section className={styles.container}>
      <AuthHeaderForm title={titleForm} subtitle={subtitleForm} />
      {emailSent ? (
        <div className={styles.successActions}>
          <ButtonLink variant="tonal" to="/auth/login">
            Go back to log in
          </ButtonLink>
        </div>
      ) : (
        <ForgotPasswordForm onSuccess={() => setEmailSent(true)} />
      )}
    </section>
  )
}

export default ForgotPasswordPage
