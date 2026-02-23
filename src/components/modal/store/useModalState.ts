import { useAppSelector } from '@/store/reduxStore'

/**
 * Modal State Hook
 *
 * Provides read-only access to modal open/closed state.
 * Use this hook when you only need to check if a modal is open.
 *
 * For opening/closing modals, use `useModalActions` instead.
 *
 * @param modalId - Unique identifier for the modal (use ModalIds enum)
 * @returns Boolean indicating if the modal is currently open
 *
 * @example
 * ```tsx
 * const isDeleteModalOpen = useModalState(ModalIds.DeleteConfirm)
 *
 * return isDeleteModalOpen ? <Overlay /> : null
 * ```
 */
export const useModalState = (modalId: string) => {
  const isOpen = useAppSelector(state => state.modal.openModals[modalId] ?? false)
  return { isOpen }
}
