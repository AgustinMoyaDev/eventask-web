/**
 * Task Factory
 * Generates fake ITask objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'

import type { ITask, TaskStatus } from '@/types/ITask'
import type { IUser } from '@/types/IUser'
import { TASK_STATUS } from '@/types/ITask'
import { EVENT_STATUS } from '@/types/IEvent'

import { createFakeUser } from './userFactory'
import { createSequentialEvents } from './eventFactory'
import { MOCK_CATEGORIES } from '../data/mockData'

/**
 * Select random participants from available users including the creator
 *
 * @param creator - Task creator (always included in participants)
 * @param availableUsers - Pool of users to select from
 * @param minParticipants - Minimum number of participants (default: 2)
 * @param maxParticipants - Maximum number of participants (default: 5)
 * @returns Array of selected users always including the creator
 */
function selectRandomParticipants(
  availableUsers: IUser[],
  minParticipants = 2,
  maxParticipants = 5
): IUser[] {
  if (availableUsers.length === 0) return []

  const count = faker.number.int({ min: minParticipants, max: maxParticipants })
  const randomUsers = faker.helpers.arrayElements(
    availableUsers,
    Math.min(count, availableUsers.length)
  )

  return randomUsers
}

/**
 * Creates a fake ITask object with realistic data and relationships.
 *
 * @param overwrites - Partial ITask to override default generated values
 * @returns A complete ITask object with fake data
 *
 * @example
 * ```typescript
 * // Generate random task
 * const task = createFakeTask()
 *
 * // Generate completed task
 * const completedTask = createFakeTask({ status: 'completed', progress: 100 })
 *
 * // Generate task with specific participants
 * const taskWithTeam = createFakeTask({
 *   participants: [createFakeUser(), createFakeUser()]
 * })
 * ```
 */
export function createFakeTask(overwrites: Partial<ITask> = {}): ITask {
  const category = overwrites.category ?? faker.helpers.arrayElement(MOCK_CATEGORIES)
  const creator = overwrites.creator ?? createFakeUser()

  const participants = overwrites.participants
    ? selectRandomParticipants([...overwrites.participants, creator])
    : [creator, createFakeUser()]

  const mockEvents =
    overwrites.events ??
    createSequentialEvents(faker.number.int({ min: 3, max: 5 }), {}, participants)

  const completedEvents = mockEvents.filter(me => me.status === EVENT_STATUS.COMPLETED).length
  const progress = Math.round(overwrites.progress ?? (completedEvents / mockEvents.length) * 100)
  const status: TaskStatus =
    overwrites.status ?? (progress === 100 ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING)

  const beginningDate = overwrites.beginningDate ?? faker.date.soon({ days: 30 }).toISOString()
  const completionDate =
    overwrites.completionDate ?? faker.date.future({ refDate: beginningDate }).toISOString()

  const {
    id = faker.string.uuid(),
    title = faker.lorem.sentence({ min: 3, max: 8 }).replace('.', ''),
    categoryId = category.id,
    participantsIds = participants.map(p => p.id),
    eventsIds = [],
    createdBy = creator.id,
    duration = faker.number.int({ min: 1, max: 8 }),
    events = mockEvents,
    createdAt = faker.date.past(),
    updatedAt = faker.date.recent(),
  } = overwrites

  return {
    id,
    title,
    categoryId,
    participantsIds,
    eventsIds,
    createdBy,
    category,
    creator,
    participants,
    events,
    beginningDate,
    completionDate,
    duration,
    progress,
    status,
    createdAt,
    updatedAt,
  }
}

/**
 * Creates multiple fake ITask objects.
 *
 * @param count - Number of tasks to generate
 * @param overwrites - Partial ITask applied to all generated tasks
 * @returns Array of ITask objects
 *
 * @example
 * ```typescript
 * // Generate 10 random tasks
 * const tasks = createFakeTasks(10)
 *
 * // Generate 5 pending tasks
 * const pendingTasks = createFakeTasks(5, { status: 'pending' })
 * ```
 */
export function createFakeTasks(count: number, overwrites: Partial<ITask> = {}): ITask[] {
  return Array.from({ length: count }, () => createFakeTask(overwrites))
}
