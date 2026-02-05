import { Link } from 'react-router-dom'

import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'

import { useLoginFormLogic } from './useLoginFormLogic'

import styles from './LoginForm.module.css'

export const LoginForm = () => {
  const { register, formErrors, isFormValid, loginLoading, loginAuthError, handleSubmit } =
    useLoginFormLogic()

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
      {loginAuthError?.message && <p className={styles.loginError}>{loginAuthError.message}</p>}
      <div className={styles.loginContent}>
        <Input
          type="email"
          label="Email"
          required
          autoComplete="email"
          hint="user@mail.com"
          {...register('email')}
          error={formErrors.email?.message ?? loginAuthError?.fieldsValidations?.email}
          finalStateIcon={EmailIcon}
        />

        <Input
          type="password"
          label="Password"
          required
          autoComplete="current-password"
          {...register('password')}
          error={formErrors.password?.message ?? loginAuthError?.fieldsValidations?.password}
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
      >
        {loginLoading ? (
          <span className={styles.loginLoader}>
            Loading <Loader />
          </span>
        ) : (
          'Log in'
        )}
      </Button>
    </form>
  )
}
