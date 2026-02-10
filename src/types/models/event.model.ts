import { EventStatus } from '../entities/event'
import { EventFormFields } from '../dtos/event.dto'

/**
 * Event model for form state (before submission to API)
 * Used in EventForm component for creating/editing events
 * @model
 */
export interface EventFormModel extends EventFormFields {
  /** Temporary UUID for new events or server ID for existing ones */
  id: string
  /** Event status */
  status: EventStatus
  /** Associated task ID (optional in form, required on submit) */
  taskId?: string
}
