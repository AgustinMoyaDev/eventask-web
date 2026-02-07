import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/helpers/form-validations/authSchemas'
import { useAuthActions } from '@/store/hooks/useAuthActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

/**
 * Custom hook for forgot password form logic.
 *
 * Integrates React Hook Form with Zod validation and Redux auth actions.
 *
 * @param onSuccess - Callback invoked after password reset email sent successfully
 * @returns Form methods, validation state, and loading/error states
 */
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
