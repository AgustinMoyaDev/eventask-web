/**
 * Drag & Drop constants for User feature
 * Defines draggable item types related to users
 */
export const USER_DRAG_TYPES = {
  PARTICIPANT: 'participant',
  COLLABORATOR: 'collaborator',
} as const

export type UserDragType = (typeof USER_DRAG_TYPES)[keyof typeof USER_DRAG_TYPES]
