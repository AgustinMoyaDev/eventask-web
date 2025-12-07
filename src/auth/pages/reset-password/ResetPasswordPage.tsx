import { useNavigate, useSearchParams } from 'react-router-dom'

import { TOKEN_TYPE } from '@/types/IToken'

import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { useAuthActions } from '@/store/hooks/useAuthActions'
import { EyeIcon, EyeOffIcon } from '@/components/icons/Icons'
import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'

import { useForm } from '@/hooks/useForm'
import {
  resetPasswordFields,
  resetPasswordFormValidations,
} from '@/helpers/form-validations/getResetPasswordFormValidations'

import styles from './ResetPasswordPage.module.css'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const { resetPassword, resetPasswordLoading, resetPasswordAuthError } = useAuthActions()

  const {
    newPassword,
    newPasswordValid,
    repeatPassword,
    repeatPasswordValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(resetPasswordFields, resetPasswordFormValidations)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    const result = await resetPassword({ token, newPassword, type: TOKEN_TYPE.RESET })
    if (!result?.error) {
      navigate('/auth/login')
    }
  }

  return (
    <section>
      <AuthHeaderForm title="Reset your password" />
      <p className={styles.resetPasswordError}>{resetPasswordAuthError?.message}</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="newPassword"
          label="New password"
          required
          value={newPassword}
          onChange={onInputChange}
          onBlur={() => onBlurField('newPassword')}
          error={newPasswordValid ?? resetPasswordAuthError?.fieldsValidations?.newPassword}
          touched={touchedFields.newPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
        <Input
          type="password"
          name="repeatPassword"
          label="Repeat password"
          required
          value={repeatPassword}
          onChange={onInputChange}
          onBlur={() => onBlurField('repeatPassword')}
          error={repeatPasswordValid ?? undefined}
          touched={touchedFields.repeatPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
        <Button type="submit" disabled={!isFormValid || resetPasswordLoading}>
          {resetPasswordLoading ? 'Changing...' : 'Change password'}
        </Button>
      </form>
    </section>
  )
}

export default ResetPasswordPage
