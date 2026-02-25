import { useMemo } from 'react'

import { Task } from '@/types/entities/task'
import { User } from '@/types/entities/user'

import { useTaskMutations } from '@/features/task/store/hooks/useTaskMutations'

import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'
import { useUserProfileQueries } from '@/features/user/store/hooks/useUserProfileQueries'

interface TaskParticipantsSectionProps {
  task: Task
}

/**
 * Section for managing task participants
 * Allows adding and removing participants from a task
 */
export const TaskParticipantsSection = ({ task }: TaskParticipantsSectionProps) => {
  const { id, participants = [] } = task
  const { user, fetchingProfile } = useUserProfileQueries()
  const { assignParticipant, removeParticipant } = useTaskMutations()

  const availableContacts = useMemo(() => {
    if (!user?.contacts) return []
    const participantIds = new Set(participants.map(p => p.id))
    return user.contacts.filter(contact => !participantIds.has(contact.id))
  }, [user, participants])

  const handleAddParticipant = async (participant: User) => {
    await assignParticipant({
      taskId: id,
      participantId: participant.id,
      _optimisticParticipant: participant,
    })
  }

  const handleRemoveParticipant = async (participant: User) => {
    await removeParticipant({
      taskId: id,
      participantId: participant.id,
    })
  }

  return (
    <MultiSelectInput<User>
      label="Participants"
      typeOption="email"
      options={availableContacts}
      selectedOptions={participants}
      loading={fetchingProfile}
      onAddItem={handleAddParticipant}
      onRemoveItem={handleRemoveParticipant}
      getOptionLabel={(user: User) => user.email}
      getOptionKey={(user: User) => user.id}
    />
  )
}
