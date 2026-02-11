import { Task } from '@/types/entities/task'
import { User } from '@/types/entities/user'

import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'

import { useTaskParticipantsSection } from './useTaskParticipantsSection'

interface TaskParticipantsSectionProps {
  task: Task
}

/**
 * Section for managing task participants
 * Allows adding and removing participants from a task
 */
export const TaskParticipantsSection = ({ task }: TaskParticipantsSectionProps) => {
  const {
    availableContacts,
    isLoadingContacts,
    isAssigning,
    isRemoving,
    handleAddParticipant,
    handleRemoveParticipant,
  } = useTaskParticipantsSection(task.id, task.participants)

  return (
    <MultiSelectInput<User>
      label="Participants"
      typeOption="email"
      options={availableContacts}
      selectedOptions={task.participants}
      loading={isLoadingContacts || isAssigning || isRemoving}
      onAddItem={handleAddParticipant}
      onRemoveItem={handleRemoveParticipant}
      getOptionLabel={(user: User) => user.email}
      getOptionKey={(user: User) => user.id}
    />
  )
}
