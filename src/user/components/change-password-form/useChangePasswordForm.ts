import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ModalIds } from '@/components/modal/modal.types'

import { useAuthMutations } from '@/auth/hooks/useAuthMutations'
import { useModalActions } from '@/store/hooks/useModalActions'

import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from '@/helpers/form-validations/authSchemas'

/**
 * Custom hook for change password form logic.
 *
 * Handles password change with validation and auto-closes modal on success.
 *
 * @returns Form methods, validation state, and loading/error states
 */
export const useChangePasswordForm = () => {
  const { close } = useModalActions(ModalIds.ChangePasswordForm)
  const { changePassword, changePasswordLoading, changePasswordAuthError } = useAuthMutations()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    const result = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
    if (!result?.error) {
      close()
    }
  }

  return {
    register,
    formErrors: errors,
    isFormValid: isValid,
    changePasswordLoading,
    changePasswordAuthError,
    handleSubmit: handleSubmit(onSubmit),
  }
}
