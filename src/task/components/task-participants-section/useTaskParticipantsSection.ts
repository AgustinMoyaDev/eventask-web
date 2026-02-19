import { useCallback, useMemo } from 'react'

import { User } from '@/types/entities/user'

import { useUserProfileQueries } from '@/user/store/hooks/useUserProfileQueries'

import { useAssignParticipantMutation, useRemoveParticipantMutation } from '@/services/taskApi'

/**
 * Custom hook for managing task participants section logic
 * Handles adding and removing participants from a task
 */
export const useTaskParticipantsSection = (taskId: string, currentParticipants: User[]) => {
  const { user, fetchingProfile } = useUserProfileQueries()

  const [assignParticipant, { isLoading: isAssigning }] = useAssignParticipantMutation()
  const [removeParticipant, { isLoading: isRemoving }] = useRemoveParticipantMutation()

  // Filter out participants that are already assigned
  const availableContacts = useMemo(() => {
    if (!user?.contacts) return []

    const participantIds = new Set(currentParticipants.map(p => p.id))
    return user.contacts.filter(contact => !participantIds.has(contact.id))
  }, [user, currentParticipants])

  const handleAddParticipant = useCallback(
    async (participant: User) => {
      await assignParticipant({
        taskId,
        participantId: participant.id.toString(),
      })
    },
    [taskId, assignParticipant]
  )

  const handleRemoveParticipant = useCallback(
    async (participant: User) => {
      await removeParticipant({
        taskId,
        participantId: participant.id.toString(),
      })
    },
    [taskId, removeParticipant]
  )

  return {
    availableContacts,
    isLoadingContacts: fetchingProfile,
    isAssigning,
    isRemoving,
    handleAddParticipant,
    handleRemoveParticipant,
  }
}
