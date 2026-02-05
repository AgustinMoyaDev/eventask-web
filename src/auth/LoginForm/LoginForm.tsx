import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { EmailIcon, EyeIcon, EyeOffIcon } from '@/components/icons/Icons'

import { useAuthActions } from '@/store/hooks/useAuthActions'
import { loginSchema, type LoginSchemaType } from '@/helpers/form-validations/authSchemas'

import styles from './LoginForm.module.css'

export const LoginForm = () => {
  const { login, loginLoading, loginAuthError } = useAuthActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginSchemaType) => {
    login(data)
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      {loginAuthError?.message && <p className={styles.loginError}>{loginAuthError.message}</p>}
      <div className={styles.loginContent}>
        <Input
          type="email"
          label="Email"
          required
          autoComplete="email"
          hint="user@mail.com"
          {...register('email')}
          error={errors.email?.message ?? loginAuthError?.fieldsValidations?.email}
          finalStateIcon={EmailIcon}
        />

        <Input
          type="password"
          label="Password"
          required
          autoComplete="current-password"
          {...register('password')}
          error={errors.password?.message ?? loginAuthError?.fieldsValidations?.password}
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
        disabled={!isValid || loginLoading}
      >
        {loginLoading ? 'Loading ...' : 'Log in'}
      </Button>
    </form>
  )
}
