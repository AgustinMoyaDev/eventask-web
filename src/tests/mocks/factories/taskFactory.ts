/**
 * Task Factory
 * Generates fake Task objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'

import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax.js'
dayjs.extend(minMax)

import type { Task, TaskStatus } from '@/types/entities/task'
import type { User } from '@/types/entities/user'
import { TASK_STATUS } from '@/types/entities/task'
import { Event, EVENT_STATUS } from '@/types/entities/event'

import { createFakeUser } from './userFactory'
import { createSequentialEvents } from './eventFactory'
import { MOCK_CATEGORIES } from '../data/mockData'

/**
 * Capitalize first letter of a string
 */
function capitalize(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Map categories to contextual title generators
 * Uses Faker's specialized methods for realistic titles
 */
const CATEGORY_TITLE_GENERATORS: Record<string, () => string> = {
  Development: () =>
    faker.helpers.arrayElement([
      `Implement ${faker.hacker.noun()} feature`,
      `Fix ${faker.hacker.noun()} bug`,
      `Refactor ${faker.hacker.noun()} module`,
      `Add ${faker.hacker.verb()} functionality`,
    ]),
  Design: () =>
    faker.helpers.arrayElement([
      `Design ${faker.commerce.product()} mockup`,
      `Create ${faker.commerce.productAdjective()} UI components`,
      `Update brand identity guidelines`,
      `Design landing page wireframes`,
    ]),
  Marketing: () =>
    faker.helpers.arrayElement([
      `Launch ${faker.commerce.product()} campaign`,
      `Plan social media strategy`,
      `Create content calendar`,
      `Analyze market trends`,
    ]),
  Sales: () =>
    faker.helpers.arrayElement([
      `Follow up with ${faker.company.name()}`,
      `Prepare sales presentation`,
      `Update CRM pipeline`,
      `Client discovery call`,
    ]),
  Support: () =>
    faker.helpers.arrayElement([
      `Resolve customer ticket #${faker.number.int({ min: 1000, max: 9999 })}`,
      `Update knowledge base article`,
      `Customer onboarding session`,
      `Technical support escalation`,
    ]),
  Research: () =>
    faker.helpers.arrayElement([
      `Research ${faker.commerce.productMaterial()} alternatives`,
      `Competitive analysis report`,
      `User research interviews`,
      `Market research study`,
    ]),
  Planning: () =>
    faker.helpers.arrayElement([
      `Q${faker.number.int({ min: 1, max: 4 })} strategic planning`,
      `Sprint planning meeting`,
      `Resource allocation review`,
      `Project roadmap update`,
    ]),
  Testing: () =>
    faker.helpers.arrayElement([
      `QA testing for ${faker.hacker.noun()}`,
      `Automated test suite setup`,
      `Performance testing session`,
      `User acceptance testing`,
    ]),
  Documentation: () =>
    faker.helpers.arrayElement([
      `Write API documentation`,
      `Update user manual`,
      `Create onboarding guide`,
      `Document ${faker.hacker.noun()} process`,
    ]),
  Deployment: () =>
    faker.helpers.arrayElement([
      `Deploy to ${faker.helpers.arrayElement(['staging', 'production', 'QA'])}`,
      `Database migration setup`,
      `CI/CD pipeline configuration`,
      `Release v${faker.system.semver()}`,
    ]),
  Meeting: () =>
    faker.helpers.arrayElement([
      `${faker.helpers.arrayElement(['Weekly', 'Monthly', 'Quarterly'])} team sync`,
      `${faker.company.buzzNoun()} stakeholder meeting`,
      `One-on-one with ${faker.person.firstName()}`,
      `${faker.helpers.arrayElement(['Sprint', 'Project'])} retrospective`,
    ]),
  Review: () =>
    faker.helpers.arrayElement([
      `Code review session`,
      `Performance review meeting`,
      `Design review for ${faker.commerce.product()}`,
      `Quarterly business review`,
    ]),
}

/**
 * Generate contextual task title based on category
 */
function generateTaskTitle(categoryName: string): string {
  const generator = CATEGORY_TITLE_GENERATORS[categoryName]
  return generator
    ? capitalize(generator())
    : capitalize(faker.lorem.sentence({ min: 3, max: 6 }).replace('.', ''))
}

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
  availableUsers: User[],
  minParticipants = 2,
  maxParticipants = 5
): User[] {
  if (availableUsers.length === 0) return []

  const count = faker.number.int({ min: minParticipants, max: maxParticipants })
  const randomUsers = faker.helpers.arrayElements(
    availableUsers,
    Math.min(count, availableUsers.length)
  )

  return randomUsers
}

/**
 * Calculate the total duration of a task based on its events
 *
 * @param events
 * @returns duration in hours
 */
export function calculateTaskDuration(events: Event[]): number {
  const starts = events.map(e => dayjs(e.start)).filter(e => e.isValid())
  const ends = events.map(e => dayjs(e.end)).filter(e => e.isValid())

  if (starts.length === 0 || ends.length === 0) return 0

  const minStart = dayjs.min(...starts)
  const maxEnd = dayjs.max(...ends)

  if (!minStart || !maxEnd) return 0

  const duration = events.reduce((acc, ev) => {
    const start = dayjs(ev.start)
    const end = dayjs(ev.end)
    if (start.isValid() && end.isValid()) {
      return acc + end.diff(start, 'hour', true)
    }
    return acc
  }, 0)

  return duration
}

/**
 * Creates a fake Task object with realistic data and relationships.
 *
 * @param overwrites - Partial Task to override default generated values
 * @returns A complete Task object with fake data
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
export function createFakeTask(overwrites: Partial<Task> = {}): Task {
  const category = overwrites.category ?? faker.helpers.arrayElement(MOCK_CATEGORIES)
  const creator = overwrites.creator ?? createFakeUser()

  const participants = overwrites.participants
    ? selectRandomParticipants([...overwrites.participants, creator])
    : [creator, createFakeUser()]

  const randomNumberOfEvents = faker.number.int({ min: 3, max: 5 })

  const mockEvents =
    overwrites.events ??
    createSequentialEvents(randomNumberOfEvents, {}, participants, category.name)

  const completedEvents = mockEvents.filter(me => me.status === EVENT_STATUS.COMPLETED).length
  const progress = Math.round(overwrites.progress ?? (completedEvents / mockEvents.length) * 100)
  const status: TaskStatus =
    overwrites.status ??
    (progress === 100
      ? TASK_STATUS.COMPLETED
      : progress === 0
        ? TASK_STATUS.PENDING
        : TASK_STATUS.PROGRESS)

  const beginningDate = overwrites.beginningDate ?? faker.date.soon({ days: 30 }).toISOString()
  const completionDate =
    overwrites.completionDate ?? faker.date.future({ refDate: beginningDate }).toISOString()

  const {
    id = faker.string.uuid(),
    title = generateTaskTitle(category.name),
    categoryId = category.id,
    participantsIds = participants.map(p => p.id),
    createdBy = creator.id,
    duration = calculateTaskDuration(mockEvents),
    events = mockEvents,
    eventsIds = mockEvents.map(e => e.id),
    createdAt = faker.date.past().toISOString(),
    updatedAt = faker.date.recent().toISOString(),
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
 * Creates multiple fake Task objects.
 *
 * @param count - Number of tasks to generate
 * @param overwrites - Partial Task applied to all generated tasks
 * @returns Array of Task objects
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
export function createFakeTasks(count: number, overwrites: Partial<Task> = {}): Task[] {
  return Array.from({ length: count }, () => createFakeTask(overwrites))
}
