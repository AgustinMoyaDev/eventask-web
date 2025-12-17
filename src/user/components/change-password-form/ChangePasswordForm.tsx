import { ModalIds } from '@/types/ui/modal'

import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { EyeIcon, EyeOffIcon } from '@/components/icons/Icons'

import { useAuthActions } from '@/store/hooks/useAuthActions'
import { useModalActions } from '@/store/hooks/useModalActions'

import {
  changePasswordFields,
  changePasswordFormValidations,
} from '@/helpers/form-validations/getChangePasswordFormValidations'
import { useForm } from '@/hooks/useForm'

import styles from './ChangePasswordForm.module.css'

export const ChangePasswordForm = () => {
  const { close } = useModalActions(ModalIds.ChangePasswordForm)
  const { changePassword, changePasswordLoading, changePasswordAuthError } = useAuthActions()
  const {
    currentPassword,
    currentPasswordValid,
    newPassword,
    newPasswordValid,
    confirmPassword,
    confirmPasswordValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(changePasswordFields, changePasswordFormValidations)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await changePassword({ currentPassword, newPassword })

    if (!result?.error) {
      close()
    }
  }

  const displayError = changePasswordAuthError?.message

  return (
    <div className={styles.changePasswordContainer}>
      <h3 className={styles.changePasswordTitle}>Change Manual Password</h3>
      {displayError && (
        <p className={styles.changePasswordFormBackendError} role="alert">
          {displayError}
        </p>
      )}

      <p className={styles.changePasswordDescription}>
        Change your password to log in using email and password as a backup method.
      </p>

      <form className={styles.changePasswordForm} onSubmit={handleSubmit}>
        <Input
          type="password"
          name="currentPassword"
          label="Current Password"
          required
          value={currentPassword}
          onChange={onInputChange}
          onBlur={() => onBlurField('currentPassword')}
          error={
            currentPasswordValid ?? changePasswordAuthError?.fieldsValidations?.currentPassword
          }
          touched={touchedFields.currentPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
        <Input
          type="password"
          name="newPassword"
          label="New Password"
          required
          value={newPassword}
          onChange={onInputChange}
          onBlur={() => onBlurField('newPassword')}
          error={newPasswordValid ?? changePasswordAuthError?.fieldsValidations?.newPassword}
          touched={touchedFields.newPassword}
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Repeat password"
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
          disabled={!isFormValid || changePasswordLoading}
        >
          {changePasswordLoading ? 'Changing...' : 'Change Password'}
        </Button>
      </form>
    </div>
  )
}
