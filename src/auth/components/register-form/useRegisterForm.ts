import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthMutations } from '@/auth/hooks/useAuthMutations'
import { registerSchema, type RegisterSchemaType } from '@/helpers/form-validations/authSchemas'

export function useRegisterForm() {
  const { register: registerUser, registerLoading, registerAuthError } = useAuthMutations()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: RegisterSchemaType) => {
    // Exclude confirmPassword before sending data to backend
    const { confirmPassword: _, ...userData } = data
    registerUser(userData)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isFormValid: isValid,
    registerLoading,
    registerAuthError,
  }
}
