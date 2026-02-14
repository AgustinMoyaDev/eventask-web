import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ModalIds } from '@/components/modal/modal.types'

import { useAuthMutations } from '@/auth/hooks/useAuthMutations'
import { useModalActions } from '@/store/hooks/useModalActions'

import { setPasswordSchema, SetPasswordSchemaType } from '@/helpers/form-validations/authSchemas'

export const useSetPasswordForm = () => {
  const { close } = useModalActions(ModalIds.SetPasswordForm)
  const { setPassword, setPasswordLoading, setPasswordAuthError } = useAuthMutations()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SetPasswordSchemaType>({
    resolver: zodResolver(setPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SetPasswordSchemaType) => {
    const result = await setPassword({ newPassword: data.newPassword })

    if (!result?.error) {
      close()
    }
  }

  return {
    register,
    formErrors: errors,
    isFormValid: isValid,
    setPasswordLoading,
    setPasswordAuthError,
    handleSubmit: handleSubmit(onSubmit),
  }
}
