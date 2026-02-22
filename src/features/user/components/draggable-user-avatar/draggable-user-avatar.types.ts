import { DnDSize, DraggableProps } from '@/components/drag-n-drop/types/drag-n-drop.types'
import { ParticipantDragData } from '@/features/user/types/user-drag.types'

export interface DraggableUserAvatarProps extends Omit<
  DraggableProps,
  'data' | 'style' | 'children'
> {
  data: ParticipantDragData
  size?: DnDSize
}
