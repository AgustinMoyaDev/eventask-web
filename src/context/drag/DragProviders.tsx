import { ReactNode } from 'react'

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DropAnimation,
} from '@dnd-kit/core'

import { restrictToWindowEdges } from '@dnd-kit/modifiers'

interface DragProviderProps {
  children: ReactNode
  onDragStart: (e: DragStartEvent) => void
  onDragEnd: (e: DragEndEvent) => void
  overlay?: ReactNode
  dropAnimation?: DropAnimation | null
}

/**
 * DragProviders
 * - Wraps DnD context and exposes sensible defaults (pointer + keyboard sensors,
 *   closestCenter collision detection and a DragOverlay portal container).
 * - We intentionally keep this small and composable.
 *
 * @param children - UI that contains draggable sources and drop targets
 * @param onDragStart - handler forwarded from parent (receives DnD event)
 * @param onDragEnd - handler forwarded from parent (receives DnD event)
 * @param overlay - optional ReactNode rendered inside a DragOverlay portal
 */
export const DragProviders = ({
  children,
  onDragStart,
  onDragEnd,
  overlay,
  dropAnimation,
}: DragProviderProps) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const animation = dropAnimation ?? {
    duration: 300,
    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
  }

  return (
    <DndContext
      id="drag-context"
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={animation} adjustScale={false}>
        {overlay ?? null}
      </DragOverlay>
    </DndContext>
  )
}
