import { EventFormModel } from '@/types/models/event.model'

export interface EventFormProps {
  onAddEvent: (event: EventFormModel) => void
  onUpdateEvent: (event: EventFormModel) => void
  existingEvents?: EventFormModel[]
  eventToEdit?: EventFormModel | null
}
