import { Link } from 'react-router-dom'

import { CardIdIcon, EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'

import { useForm } from '@/hooks/useForm'
import {
  registerFormFields,
  registerFormValidations,
} from '@/helpers/form-validations/getRegisterFormValidations'
import { useAuthActions } from '@/store/hooks/useAuthActions'

import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  const {
    firstName,
    firstNameValid,
    lastName,
    lastNameValid,
    email,
    emailValid,
    password,
    passwordValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(registerFormFields, registerFormValidations)
  const { register, registerLoading, registerAuthError } = useAuthActions()

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register({
      firstName,
      lastName,
      email,
      password,
    })
  }

  return (
    <section>
      <AuthHeaderForm title="Create new account" />
      <p className={styles.registerError}>{registerAuthError?.message}</p>
      <form className={styles.registerForm} onSubmit={handleRegisterSubmit}>
        <Input
          required
          type="text"
          name="firstName"
          label="First name"
          placeholder=""
          value={firstName}
          autoComplete="given-name"
          error={firstNameValid ?? registerAuthError?.fieldsValidations?.firstName}
          touched={touchedFields.firstName}
          finalStateIcon={CardIdIcon}
          onChange={onInputChange}
          onBlur={() => onBlurField('firstName')}
        />

        <Input
          required
          type="text"
          name="lastName"
          label="Last name"
          placeholder=""
          value={lastName}
          autoComplete="family-name"
          error={lastNameValid ?? registerAuthError?.fieldsValidations?.lastName}
          touched={touchedFields.lastName}
          finalStateIcon={CardIdIcon}
          onChange={onInputChange}
          onBlur={() => onBlurField('lastName')}
        />

        <Input
          required
          type="email"
          name="email"
          label="Email"
          placeholder=""
          value={email}
          autoComplete="off"
          hint="user@mail.com"
          error={emailValid ?? registerAuthError?.fieldsValidations?.email}
          touched={touchedFields.email}
          finalStateIcon={EmailIcon}
          onChange={onInputChange}
          onBlur={() => onBlurField('email')}
        />

        <Input
          required
          type="password"
          name="password"
          label="Password"
          placeholder=""
          value={password}
          autoComplete="new-password"
          error={passwordValid ?? registerAuthError?.fieldsValidations?.password}
          touched={touchedFields.password ?? registerAuthError?.fieldsValidations?.password}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
          onChange={onInputChange}
          onBlur={() => onBlurField('password')}
        />

        <Button
          type="submit"
          variant="filled"
          size="lg"
          className={styles.registerButton}
          disabled={!isFormValid}
        >
          {`${registerLoading ? 'Loading ...' : 'Create account'}`}
        </Button>
      </form>

      <p className={styles.registerSwitch}>
        Already have an account?
        <Link to="/auth/login">Log in.</Link>
      </p>
    </section>
  )
}

export default RegisterPage
