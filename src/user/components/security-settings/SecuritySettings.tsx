import { ModalIds } from '@/types/ui/modal'
import { IUser } from '@/types/IUser'

import { useModalActions } from '@/store/hooks/useModalActions'

import { Chip } from '@/components/chip/Chip'
import { Button } from '@/components/button/Button'
import { GoogleIcon, LockIcon, EditIcon, PlusIcon } from '@/components/icons/Icons'
import { Modal } from '@/components/modal/Modal'

import { SetPasswordForm } from '../set-password-form/SetPasswordForm'
import { ChangePasswordForm } from '../change-password-form/ChangePasswordForm'

import styles from './SecuritySettings.module.css'

interface SecuritySettingsProps {
  user: IUser
}

export const SecuritySettings = ({ user }: SecuritySettingsProps) => {
  const {
    isOpen: isSetOpen,
    open: openSet,
    close: closeSet,
  } = useModalActions(ModalIds.SetPasswordForm)
  const {
    isOpen: isChangeOpen,
    open: openChange,
    close: closeChange,
  } = useModalActions(ModalIds.ChangePasswordForm)

  return (
    <section>
      <h3 className={styles.title}>Security Settings</h3>

      {isSetOpen && (
        <Modal isOpen={isSetOpen} onClose={closeSet}>
          <SetPasswordForm />
        </Modal>
      )}

      {isChangeOpen && (
        <Modal isOpen={isChangeOpen} onClose={closeChange}>
          <ChangePasswordForm />
        </Modal>
      )}

      <div className={styles.authMethods}>
        <div className={styles.method}>
          <LockIcon />
          <span className={styles.methodTitle}>Manual Password</span>
          {user.hasManualPassword ? (
            <>
              <Button
                variant="fab"
                size="sm"
                onClick={() => openChange()}
                aria-label="Edit password"
              >
                <EditIcon />
              </Button>
              <Chip label="Active" color="completed" />
            </>
          ) : (
            <>
              <Button variant="fab" size="sm" onClick={() => openSet()} aria-label="Set password">
                <PlusIcon />
              </Button>
              <Chip label="Pending" color="pending" />
            </>
          )}
        </div>

        <div className={styles.method}>
          <GoogleIcon />
          {user.googleId ? (
            <>
              <span className={styles.methodTitle}>Google Account Connected</span>
              <Chip label="Active" color="completed" />
            </>
          ) : (
            <>
              <span className={styles.methodTitle}>You haven't logged in with Google yet</span>
              <Chip label="Pending" color="pending" />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
