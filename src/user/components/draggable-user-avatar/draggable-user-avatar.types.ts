import { DnDSize, DraggableProps } from '@/types/ui/dragNdrop'
import { ParticipantDragData } from '@/user/types/user-drag.types'

export interface DraggableUserAvatarProps extends Omit<
  DraggableProps,
  'data' | 'style' | 'children'
> {
  data: ParticipantDragData
  size?: DnDSize
}
