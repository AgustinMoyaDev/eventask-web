import { DraggableData } from '@/components/drag-n-drop/types/drag-n-drop.types'

/**
 * Drag data for user participants/collaborators
 * Extends base DraggableData with user-specific fields
 */
export interface ParticipantDragData extends DraggableData {
  firstName: string
  lastName: string
  imageUrl: string
}
