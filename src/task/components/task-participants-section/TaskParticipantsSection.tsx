import { ITask } from '@/types/ITask'
import { IUser } from '@/types/IUser'

import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'

import { useTaskParticipantsSection } from './useTaskParticipantsSection'

interface TaskParticipantsSectionProps {
  task: ITask
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
    <MultiSelectInput<IUser>
      label="Participants"
      typeOption="email"
      options={availableContacts}
      selectedOptions={task.participants}
      loading={isLoadingContacts || isAssigning || isRemoving}
      onAddItem={handleAddParticipant}
      onRemoveItem={handleRemoveParticipant}
      getOptionLabel={(user: IUser) => user.email}
      getOptionKey={(user: IUser) => user.id}
    />
  )
}
