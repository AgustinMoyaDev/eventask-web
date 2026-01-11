import { ITaskForm } from '@/types/ITask'
import { ITaskCreatePayload, ITaskUpdatePayload } from '@/types/dtos/task'
import { ICategory } from '@/types/ICategory'
import { IEventForm, IEventLocal } from '@/types/IEvent'

import { FormValidations } from '@/hooks/useForm'

export const taskFormFields: ITaskForm = {
  title: '',
  category: '',
  participants: [],
  events: [],
}

export const taskFormValidations: FormValidations<typeof taskFormFields> = {
  title: [[value => !value, 'Title is required.']],
  category: [[value => !value, 'You must select a category.']],
  events: [[value => value.length === 0, 'You must add at least one event.']],
}

const mapEventLocalToEventForm = (events: IEventLocal[]): IEventForm[] => {
  return events.map(evt => ({
    id: evt.id,
    title: evt.title,
    start: new Date(evt.start).toISOString(),
    end: new Date(evt.end).toISOString(),
    notes: evt.notes,
  }))
}

export const mapTaskFormToCreatePayload = (
  form: ITaskForm,
  categories: ICategory[]
): ITaskCreatePayload => {
  const { title, category, events, participants } = form
  return {
    title: title.trim(),
    categoryId: categories.find(cat => cat.name === category)!.id,
    participantsIds: participants.map(p => p.id),
    events: mapEventLocalToEventForm(events),
  }
}

export const mapTaskFormToUpdatePayload = (
  taskId: string,
  form: ITaskForm,
  categories: ICategory[]
): ITaskUpdatePayload => {
  const { title, category, events, participants } = form
  return {
    id: taskId,
    title: title.trim(),
    categoryId: categories.find(cat => cat.name === category)!.id,
    participantsIds: participants.map(p => p.id),
    events: mapEventLocalToEventForm(events),
  }
}
