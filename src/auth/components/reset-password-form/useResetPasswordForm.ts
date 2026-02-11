import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  resetPasswordSchema,
  type ResetPasswordSchemaType,
} from '@/helpers/form-validations/authSchemas'
import { TOKEN_TYPE } from '@/types/entities/token'

import { useAuthActions } from '@/store/hooks/useAuthActions'

export function useResetPasswordForm(token: string, onSuccess: () => void) {
  const { resetPassword, resetPasswordLoading, resetPasswordAuthError } = useAuthActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    const result = await resetPassword({
      token,
      newPassword: data.password,
      type: TOKEN_TYPE.RESET,
    })

    if (!result?.error) {
      onSuccess()
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isFormValid: isValid,
    resetPasswordLoading,
    resetPasswordAuthError,
  }
}
