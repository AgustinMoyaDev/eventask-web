import { Link } from 'react-router-dom'

import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'

import { EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'

import { useForm } from '@/hooks/useForm'
import { useAuthActions } from '@/store/hooks/useAuthActions'

import {
  loginFormFields,
  loginFormValidations,
} from '@/helpers/form-validations/getLoginFormValidations'
import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'

import styles from './LoginPage.module.css'

const LoginPage = () => {
  const { login, loginWithGoogle, loginLoading, loginAuthError, loginWithGoogleAuthError } =
    useAuthActions()

  const {
    email,
    emailValid,
    password,
    passwordValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(loginFormFields, loginFormValidations)

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential returned from Google log in')
      return
    }
    await loginWithGoogle({ idToken: credentialResponse.credential })
  }

  const handleGoogleError = () => {
    console.error('Google log in failed')
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return
    await login({ email, password })
  }

  return (
    <section>
      <AuthHeaderForm title="Log in to your account" />
      <p className={styles.loginError}>
        {loginAuthError?.message || loginWithGoogleAuthError?.message}
      </p>
      <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
        <div className={styles.loginContent}>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder=""
            required
            value={email}
            autoComplete="email"
            hint="user@mail.com"
            error={emailValid ?? loginAuthError?.fieldsValidations?.email}
            touched={touchedFields.email}
            finalStateIcon={EmailIcon}
            onChange={onInputChange}
            onBlur={() => onBlurField('email')}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            placeholder=""
            required
            value={password}
            autoComplete="current-password"
            error={passwordValid ?? loginAuthError?.fieldsValidations?.password}
            touched={touchedFields.password}
            initialStateIcon={EyeIcon}
            finalStateIcon={EyeOffIcon}
            onChange={onInputChange}
            onBlur={() => onBlurField('password')}
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
          {`${loginLoading ? 'Loading ...' : 'Log in'}`}
        </Button>
      </form>
      <div className={styles.loginSocial}>
        <p className={styles.loginSocialTitle}>Or access with:</p>
        <div className={styles.loginSocialLinks}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            type="icon"
            shape="circle"
            theme="filled_black"
          />
        </div>
      </div>
      <p className={styles.loginSwitch}>
        <span>Don't have an account?&nbsp;</span>
        <Link to="/auth/register">Create account.</Link>
      </p>
    </section>
  )
}

export default LoginPage
