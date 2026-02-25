import { Category } from '../entities/category'
import { User } from '../entities/user'

export interface CreateTaskDto {
  title: string
  categoryId: string
}

export interface UpdateTaskDto {
  id: string
  title?: string
  categoryId?: string
  _optimisticCategory?: Category
}

export interface ParticipantDto {
  taskId: string
  participantId: string
  _optimisticParticipant?: User
}
