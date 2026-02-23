import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { CardIdIcon, EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'

import { useRegisterForm } from './useRegisterForm'

import styles from './RegisterForm.module.css'

export const RegisterForm = () => {
  const { register, handleSubmit, errors, isFormValid, registerLoading, registerError } =
    useRegisterForm()

  const displayBackendError = registerError?.message

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
      {displayBackendError && (
        <p className={styles.registerError} role="alert" aria-live="polite">
          {displayBackendError}
        </p>
      )}

      <Input
        type="text"
        label="First name"
        placeholder=""
        autoComplete="given-name"
        {...register('firstName')}
        error={errors.firstName?.message ?? registerError?.fieldErrors?.firstName}
        finalStateIcon={CardIdIcon}
      />

      <Input
        type="text"
        label="Last name"
        placeholder=""
        autoComplete="family-name"
        {...register('lastName')}
        error={errors.lastName?.message ?? registerError?.fieldErrors?.lastName}
        finalStateIcon={CardIdIcon}
      />

      <Input
        type="email"
        label="Email"
        placeholder=""
        autoComplete="email"
        hint="user@mail.com"
        {...register('email')}
        error={errors.email?.message ?? registerError?.fieldErrors?.email}
        finalStateIcon={EmailIcon}
      />

      <Input
        type="password"
        label="Password"
        placeholder=""
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message ?? registerError?.fieldErrors?.password}
        initialStateIcon={EyeIcon}
        finalStateIcon={EyeOffIcon}
      />

      <Input
        type="password"
        label="Confirm Password"
        placeholder=""
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        initialStateIcon={EyeIcon}
        finalStateIcon={EyeOffIcon}
      />

      <Button
        type="submit"
        variant="filled"
        size="lg"
        className={styles.registerButton}
        disabled={!isFormValid || registerLoading}
        aria-busy={registerLoading}
        {...(registerLoading && { 'aria-label': 'Creating account' })}
      >
        {registerLoading ? <Loader text="Loading" /> : 'Create account'}
      </Button>
    </form>
  )
}
