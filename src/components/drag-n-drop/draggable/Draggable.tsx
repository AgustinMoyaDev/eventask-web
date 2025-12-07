import { useDraggable } from '@dnd-kit/core'

import clsx from 'clsx'

import { DraggableProps } from '@/types/ui/dragNdrop'

import styles from './Draggable.module.css'

/**
 * Generic Draggable component
 * - Wraps any content to make it draggable
 * - Centralizes all drag-and-drop logic
 * - Reusable across different content types
 * @param data - Additional data associated with the draggable item
 * like Unique identifier and type of the draggable item (both required)
 * and optional originId for tracking purposes.
 * E.g.: 'event', 'task'
 * @param disabled - Whether the draggable item is disabled
 * @param className - Additional CSS classes for styling
 * @param children - Content to render inside the draggable area
 */
export const Draggable = ({ data, children, disabled = false, className }: DraggableProps) => {
  const { type, id, originId, originName } = data
  const draggableId = `${originName}-${originId}-${type}-${id}`
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: draggableId,
    data,
    disabled,
  })

  return (
    <section
      ref={setNodeRef}
      className={clsx(
        !disabled && styles.draggable,
        isDragging && styles.draggableActive,
        className
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </section>
  )
}
