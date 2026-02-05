import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { CardIdIcon, EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { Loader } from '@/components/loaders/loader/Loader'

import { useRegisterForm } from './useRegisterForm'

import styles from './RegisterForm.module.css'

export const RegisterForm = () => {
  const { register, handleSubmit, errors, isValid, registerLoading, registerAuthError } =
    useRegisterForm()

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
      {registerAuthError?.message && (
        <p className={styles.registerError}>{registerAuthError.message}</p>
      )}

      <Input
        type="text"
        label="First name"
        placeholder=""
        autoComplete="given-name"
        {...register('firstName')}
        error={errors.firstName?.message ?? registerAuthError?.fieldsValidations?.firstName}
        finalStateIcon={CardIdIcon}
      />

      <Input
        type="text"
        label="Last name"
        placeholder=""
        autoComplete="family-name"
        {...register('lastName')}
        error={errors.lastName?.message ?? registerAuthError?.fieldsValidations?.lastName}
        finalStateIcon={CardIdIcon}
      />

      <Input
        type="email"
        label="Email"
        placeholder=""
        autoComplete="email"
        hint="user@mail.com"
        {...register('email')}
        error={errors.email?.message ?? registerAuthError?.fieldsValidations?.email}
        finalStateIcon={EmailIcon}
      />

      <Input
        type="password"
        label="Password"
        placeholder=""
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message ?? registerAuthError?.fieldsValidations?.password}
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
        disabled={!isValid || registerLoading}
      >
        {registerLoading ? (
          <span className={styles.registerLoader}>
            Loading <Loader />
          </span>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  )
}
