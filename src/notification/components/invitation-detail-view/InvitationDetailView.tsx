import { InvitationDetailViewProps } from './invitation-detail-view.types'

import { Button } from '@/components/button/Button'
import { ArrowLeftIcon } from '@/components/icons/Icons'

import { useInvitationMutations } from '@/invitation/store/hooks/useInvitationMutations'

import styles from './InvitationDetailView.module.css'

/**
 * Detailed view for invitation notifications with accept/reject actions
 */
export const InvitationDetailView = ({ notification, onBack }: InvitationDetailViewProps) => {
  const { data } = notification
  const { acceptInvitation, rejectInvitation, accepting, rejecting } = useInvitationMutations()

  const handleAccept = async () => {
    const { invitationId } = data ?? {}
    if (!invitationId) return
    await acceptInvitation({ invitationId })
    onBack?.() // Return to list after action
  }

  const handleReject = async () => {
    const { invitationId } = data ?? {}
    if (!invitationId) return
    await rejectInvitation({ invitationId })
    onBack?.()
  }

  const handleBackClick = () => {
    onBack?.()
  }

  return (
    <section className={styles.detail}>
      <header className={styles.header}>
        <Button
          size="sm"
          variant="icon"
          onClick={handleBackClick}
          aria-label="Back to notifications"
        >
          <ArrowLeftIcon />
        </Button>
        <h3 className="text-title-md">Contact Invitation</h3>
      </header>

      <section className={styles.content}>
        <header className={styles.headerInfo}>
          <span className={styles.title}>{notification.title}</span>
          <p className={styles.message}>{notification.message}</p>
        </header>

        <div className={styles.actions}>
          <Button
            size="sm"
            variant="filled"
            onClick={handleAccept}
            disabled={accepting || rejecting}
          >
            {accepting ? 'Accepting...' : 'Accept'}
          </Button>
          <Button
            size="sm"
            variant="outlined"
            onClick={handleReject}
            disabled={rejecting || accepting}
          >
            {rejecting ? 'Rejecting...' : 'Reject'}
          </Button>
        </div>
      </section>
    </section>
  )
}
