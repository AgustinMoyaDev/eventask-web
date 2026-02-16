import { Link } from 'react-router-dom'

import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'

import { useLoginForm } from './useLoginForm'

import styles from './LoginForm.module.css'

export const LoginForm = () => {
  const { register, formErrors, isFormValid, loginLoading, loginError, handleSubmit } =
    useLoginForm()

  const displayBackendError = loginError?.message

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
      {displayBackendError && (
        <p className={styles.loginError} role="alert" aria-live="polite">
          {displayBackendError}
        </p>
      )}
      <div className={styles.loginContent}>
        <Input
          type="email"
          label="Email"
          required
          autoComplete="email"
          hint="user@mail.com"
          {...register('email')}
          error={formErrors.email?.message ?? loginError?.fieldErrors?.email}
          finalStateIcon={EmailIcon}
        />

        <Input
          type="password"
          label="Password"
          required
          autoComplete="current-password"
          {...register('password')}
          error={formErrors.password?.message ?? loginError?.fieldErrors?.password}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
      </div>

      <Link className={styles.loginForgot} to="/auth/forgot-password">
        Forgot your password?
      </Link>

      <Button
        type="submit"
        variant="filled"
        size="lg"
        className={styles.loginButton}
        disabled={!isFormValid || loginLoading}
        aria-busy={loginLoading}
        {...(loginLoading && { 'aria-label': 'Logging in' })}
      >
        {loginLoading ? <Loader text="Loading" /> : 'Log in'}
      </Button>
    </form>
  )
}
