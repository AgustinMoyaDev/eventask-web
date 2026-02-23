import { useCallback } from 'react'

import { useAppDispatch } from '@/store/reduxStore'
import { onClose, onOpen } from './modalSlice'

/**
 * Modal Actions Hook
 *
 * Provides functions to open and close modals.
 * Use this hook when you need to trigger modal visibility changes.
 *
 * For checking if a modal is open, use `useModalState` instead.
 *
 * @param modalId - Unique identifier for the modal (use ModalIds enum)
 * @returns Object with open and close callbacks (memoized)
 *
 * @example
 * ```tsx
 * const { open, close } = useModalActions(ModalIds.Confirm)
 *
 * return (
 *   <button onClick={open}>Delete Item</button>
 * )
 * ```
 */
export const useModalActions = (modalId: string) => {
  const dispatch = useAppDispatch()

  const open = useCallback(() => {
    dispatch(onOpen(modalId))
  }, [dispatch, modalId])

  const close = useCallback(() => {
    dispatch(onClose(modalId))
  }, [dispatch, modalId])

  return {
    open,
    close,
  }
}
