import clsx from 'clsx'

import {
  DRAGGABLE_ITEM_SRC,
  DragOverlayContentProps,
  ParticipantDragData,
} from '@/types/ui/dragNdrop'

import { UserAvatar } from '@/components/user-avatar/UserAvatar'

import styles from './DragOverlayContent.module.css'

/**
 * Generic drag overlay content renderer
 * - Handles different types of draggable elements
 * - Provides consistent overlay styling
 * - Extensible for new drag types
 */
export const DragOverlayContent = ({ data }: DragOverlayContentProps) => {
  switch (data.type) {
    case DRAGGABLE_ITEM_SRC.PARTICIPANT:
    case DRAGGABLE_ITEM_SRC.COLLABORATOR: {
      const { id, imageUrl, firstName, lastName } = data as ParticipantDragData
      return (
        <div className={clsx(styles.dragOverlay, styles.dragOverlayUser)}>
          <UserAvatar
            userId={id.toString()}
            imageUrl={imageUrl}
            firstName={firstName}
            lastName={lastName}
            size="md"
            ariaLabel="Dragged user"
          />
        </div>
      )
    }

    default:
      return null
  }
}
