import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, type LoginSchemaType } from '@/helpers/form-validations/authSchemas'
import { useAuthMutations } from '@/auth/hooks/useAuthMutations'

export function useLoginForm() {
  const { login, loginLoading, loginAuthError } = useAuthMutations()

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

  return {
    register,
    formErrors: errors,
    isFormValid: isValid,
    loginLoading,
    loginAuthError,
    handleSubmit: handleSubmit(onSubmit),
  }
}
