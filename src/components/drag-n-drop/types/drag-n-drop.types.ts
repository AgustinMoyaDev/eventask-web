import { UniqueIdentifier } from '@dnd-kit/core'

/**
 * Base drag and drop types - Generic and feature-agnostic
 * Features should extend these with their specific implementations
 */

export type DnDSize = 'sm' | 'md' | 'lg'

/**
 * Generic draggable data structure
 * Features can extend this to add domain-specific fields
 */
export interface DraggableData {
  id: UniqueIdentifier
  type: string
  originId?: UniqueIdentifier
  originName?: string
}

export interface DroppableData {
  id: UniqueIdentifier
  type: string
}

/**
 * Props for draggable component wrapper
 */
export interface DraggableProps {
  data: DraggableData
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  children: React.ReactNode
}

/**
 * Props for drop zone component
 */
export interface DropZoneProps {
  itemId: string
  itemType: string
  label?: string
  children?: React.ReactNode
}

/**
 * Props for drag overlay content renderer
 * Features can pass their specific extended data types
 */
export interface DragOverlayContentProps {
  data: DraggableData
}
