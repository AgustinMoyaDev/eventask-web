import { ModalIds } from '@/types/ui/modal'

import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { EyeIcon, EyeOffIcon } from '@/components/icons/Icons'

import { useAuthActions } from '@/store/hooks/useAuthActions'
import { useModalActions } from '@/store/hooks/useModalActions'

import {
  setPasswordFields,
  setPasswordFormValidations,
} from '@/helpers/form-validations/getSetPasswordFormValidations'
import { useForm } from '@/hooks/useForm'

import styles from './SetPasswordForm.module.css'

export const SetPasswordForm = () => {
  const { close } = useModalActions(ModalIds.SetPasswordForm)
  const { setPassword, setPasswordLoading, setPasswordAuthError } = useAuthActions()
  const {
    newPassword,
    newPasswordValid,
    confirmPassword,
    confirmPasswordValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(setPasswordFields, setPasswordFormValidations)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await setPassword({ newPassword })
    if (!result?.error) {
      close()
    }
  }

  const displayError = setPasswordAuthError?.message

  return (
    <div className={styles.setPasswordContainer}>
      <h3 className={styles.setPasswordTitle}>Add Manual Password</h3>
      {displayError && (
        <p className={styles.setPasswordFormBackendError} role="alert">
          {displayError}
        </p>
      )}

      <p className={styles.setPasswordDescription}>
        Add a password to enable email and password login as a backup method.
      </p>

      <form className={styles.setPasswordForm} onSubmit={handleSubmit}>
        <Input
          type="password"
          name="newPassword"
          label="New Password"
          required
          value={newPassword}
          onChange={onInputChange}
          onBlur={() => onBlurField('newPassword')}
          error={newPasswordValid ?? setPasswordAuthError?.fieldsValidations?.newPassword}
          touched={touchedFields.newPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm password"
          required
          value={confirmPassword}
          onChange={onInputChange}
          onBlur={() => onBlurField('confirmPassword')}
          error={confirmPasswordValid}
          touched={touchedFields.confirmPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />

        <Button
          className={styles.setPasswordButton}
          type="submit"
          disabled={!isFormValid || setPasswordLoading}
        >
          {setPasswordLoading ? 'Setting...' : 'Set Password'}
        </Button>
      </form>
    </div>
  )
}
