import { Button } from '@/components/button/Button'
import { ArrowLeftIcon } from '@/components/icons/Icons'

import { InvitationDetailViewProps } from '@/types/ui/dropdown'

import { useInvitationActions } from '@/store/hooks/useInvitationActions'

import styles from './InvitationDetailView.module.css'

/**
 * Detailed view for invitation notifications with accept/reject actions
 * Similar to YouTube's nested dropdown navigation pattern
 */
export const InvitationDetailView = ({ notification, onBack }: InvitationDetailViewProps) => {
  const { data } = notification
  const { acceptInvitation, rejectInvitation, accepting, rejecting } = useInvitationActions()

  const handleAccept = async () => {
    const { invitationId } = data || {}
    if (!invitationId) return
    await acceptInvitation({ invitationId })
    onBack?.() // Return to list after action
  }

  const handleReject = async () => {
    const { invitationId } = data || {}
    if (!invitationId) return
    await rejectInvitation({ invitationId })
    onBack?.() // Return to list after action
  }

  const handleBackClick = () => {
    onBack?.()
  }

  return (
    <section className={styles.notificationDropdownInvitationDetail}>
      <header className={styles.notificationDropdownDetailHeader}>
        <Button
          variant="icon"
          className={styles.notificationDropdownBackButton}
          onClick={handleBackClick}
          aria-label="Back to notifications"
        >
          <ArrowLeftIcon size={20} />
        </Button>
        <h3>Contact Invitation</h3>
      </header>

      <section className={styles.notificationDropdownDetailContent}>
        <header className={styles.notificationDropdownInvitationInfo}>
          <span className={styles.notificationDropdownInvitationTitle}>{notification.title}</span>
          <p className={styles.notificationDropdownInvitationMessage}>{notification.message}</p>
        </header>

        <div className={styles.notificationDropdownInvitationActions}>
          <Button
            variant="filled"
            onClick={handleAccept}
            disabled={accepting || rejecting}
            className={styles.notificationDropdownAcceptButton}
          >
            {accepting ? 'Accepting...' : 'Accept'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleReject}
            disabled={rejecting || accepting}
            className={styles.notificationDropdownRejectButton}
          >
            {rejecting ? 'Rejecting...' : 'Reject'}
          </Button>
        </div>
      </section>
    </section>
  )
}
