import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/helpers/form-validations/authSchemas'
import { useAuthActions } from '@/store/hooks/useAuthActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useForgotPasswordForm(onSuccess: () => void) {
  const { forgotPassword, forgotPasswordLoading, forgotPasswordAuthError } = useAuthActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    const result = await forgotPassword({ email: data.email })
    if (!result?.error) {
      onSuccess()
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isFormValid: isValid,
    forgotPasswordLoading,
    forgotPasswordAuthError,
  }
}
