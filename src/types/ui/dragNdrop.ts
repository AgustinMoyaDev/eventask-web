import { UniqueIdentifier } from '@dnd-kit/core'

import { Size } from './size'

export const ORIGIN_NAME = {
  EVENT: 'event',
  TASK: 'task',
} as const

export const DRAGGABLE_ITEM_SRC = {
  PARTICIPANT: 'participant',
  COLLABORATOR: 'collaborator',
} as const

export const DROPPABLE_ITEM_TARGET = {
  EVENT: 'event',
  TRASH: 'trash',
} as const

export type OriginName = (typeof ORIGIN_NAME)[keyof typeof ORIGIN_NAME]
export type DraggableItemSrc = (typeof DRAGGABLE_ITEM_SRC)[keyof typeof DRAGGABLE_ITEM_SRC]
export type DroppableItemTarget = (typeof DROPPABLE_ITEM_TARGET)[keyof typeof DROPPABLE_ITEM_TARGET]

export interface DraggableData {
  id: UniqueIdentifier
  type: DraggableItemSrc
  originId?: UniqueIdentifier
  originName?: OriginName
}

export interface DroppableData {
  id: UniqueIdentifier
  type: DroppableItemTarget
}

export interface ParticipantDragData extends DraggableData {
  firstName: string
  lastName: string
  imageUrl: string
}

export interface DraggableProps {
  data: DraggableData
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  children: React.ReactNode
}

export interface DraggableUserAvatarProps extends Omit<DraggableProps, 'children'> {
  size?: Size
  data: ParticipantDragData
  originEventId?: string
}

export interface DropZoneProps {
  itemId: string
  itemType: string
  label?: string
  children?: React.ReactNode
}

export interface DragOverlayContentProps {
  data: DraggableData | ParticipantDragData
}
