/**
 * Task Factory
 * Generates fake ITask objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'
import type { ITask, TaskStatus } from '@/types/ITask'
import { TASK_STATUS } from '@/types/ITask'
import { createFakeUser } from './userFactory'
import { createFakeCategory } from './categoryFactory'

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
  // Generate related entities first
  const category = overwrites.category ?? createFakeCategory()
  const creator = overwrites.creator ?? createFakeUser()
  const participants = overwrites.participants ?? [creator, createFakeUser()]

  // Generate status and related fields
  const status: TaskStatus =
    overwrites.status ?? faker.helpers.arrayElement(Object.values(TASK_STATUS))
  const progress =
    overwrites.progress ?? (status === 'completed' ? 100 : faker.number.int({ min: 0, max: 80 }))

  // Generate dates
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
    events = [],
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
