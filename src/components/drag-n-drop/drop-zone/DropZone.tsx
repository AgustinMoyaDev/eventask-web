import clsx from 'clsx'

import { useDroppable } from '@dnd-kit/core'

import { DropZoneProps } from '@/types/ui/dragNdrop'
import { USER_DRAG_TYPES } from '@/user/constants/user-drag.constants'
import { EVENT_DRAG_CONSTANTS } from '@/event/constants/event-drag.constants'

import styles from './DropZone.module.css'

/**
 * DropZone component for drag-and-drop functionality
 * - Uses DnD Kit's useDroppable hook to create a drop target
 * - Applies styles based on whether an item is hovered over
 * - Publishes data for the dropped item
 *
 * @param itemId - Unique identifier for the droppable item
 * @param itemType - Type of the droppable item (e.g.: 'event', 'task')
 * @param children - Optional children to render inside the drop zone
 * @param label - Optional label to display in the drop zone
 *
 * @returns A React component representing a drop zone
 */
export const DropZone = ({ itemId, itemType, children, label }: DropZoneProps) => {
  const droppableId = `${itemType}-${itemId}`

  const { active, isOver, setNodeRef } = useDroppable({
    id: droppableId,
    data: { type: itemType, id: itemId },
  })

  const srcType = active?.data?.current?.type as string

  const commonClassName = clsx(
    styles.dropZone,
    active && styles.dropZoneActive,
    isOver && styles.dropZoneOver
  )

  switch (itemType) {
    // assign participant from task to event
    case EVENT_DRAG_CONSTANTS.DROP_TARGETS.EVENT: {
      const showEventZone = !!active && srcType === USER_DRAG_TYPES.PARTICIPANT
      const classNameEvent = clsx(showEventZone && commonClassName, styles.dropZoneEvent)
      return (
        <DroppableComponent
          setNodeRef={setNodeRef}
          className={classNameEvent}
          label={label}
          showContent={showEventZone}
        >
          {children}
        </DroppableComponent>
      )
    }
    // remove collaborator from event to trash
    case EVENT_DRAG_CONSTANTS.DROP_TARGETS.TRASH: {
      const showTrashZone = !!active && srcType === USER_DRAG_TYPES.COLLABORATOR
      const classNameTrash = clsx(showTrashZone && commonClassName, styles.dropZoneTrash)
      return (
        <DroppableComponent
          setNodeRef={setNodeRef}
          className={classNameTrash}
          label={label}
          showContent={showTrashZone}
        >
          {children}
        </DroppableComponent>
      )
    }
  }
}

interface DroppableComponentProps {
  setNodeRef: (element: HTMLElement | null) => void
  className: string
  showContent: boolean
  label?: string
  icon?: React.ReactNode
  children: React.ReactNode
}
const DroppableComponent = ({
  label,
  icon,
  showContent,
  className,
  setNodeRef,
  children,
}: DroppableComponentProps) => {
  return (
    <section ref={setNodeRef} className={className}>
      {showContent && (
        <div className={styles.dropZoneContent}>
          {icon && <span className={styles.dropZoneIcon}>{icon}</span>}
          <span className={styles.dropZoneLabel}>{label ?? 'Drop here'}</span>
        </div>
      )}
      {children}
    </section>
  )
}
