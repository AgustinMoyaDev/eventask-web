import clsx from 'clsx'

import { DragOverlayContentProps } from '@/components/drag-n-drop/types/drag-n-drop.types'
import { ParticipantDragData } from '@/user/types/user-drag.types'
import { USER_DRAG_TYPES } from '@/user/constants/user-drag.constants'

import { UserAvatar } from '@/user/components/user-avatar/UserAvatar'

import styles from './DragOverlayContent.module.css'

/**
 * Drag overlay content renderer for app-specific drag types
 * - Handles different types of draggable elements
 * - Provides consistent overlay styling
 * - Extensible for new drag types
 */
export const DragOverlayContent = ({ data }: DragOverlayContentProps) => {
  switch (data.type) {
    case USER_DRAG_TYPES.PARTICIPANT:
    case USER_DRAG_TYPES.COLLABORATOR: {
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
