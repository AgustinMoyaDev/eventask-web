import { faker } from '@faker-js/faker'

import { Event, EVENT_STATUS } from '@/types/entities/event'
import { User } from '@/types/entities/user'

import { createFakeUser, createFakeUsers } from './userFactory'

/**
 * Capitalize first letter of a string
 */
function capitalize(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Map categories to contextual event titles
 */
const CATEGORY_EVENT_GENERATORS: Record<string, () => string> = {
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
  Development: () =>
    faker.helpers.arrayElement([
      `Code review`,
      `Pair programming session`,
      `Architecture discussion`,
      `Debug ${faker.hacker.noun()}`,
      `Sprint planning`,
    ]),
  Design: () =>
    faker.helpers.arrayElement([
      `Design critique`,
      `Mockup review session`,
      `UI component workshop`,
      `UX feedback meeting`,
      `Design system sync`,
    ]),
  Marketing: () =>
    faker.helpers.arrayElement([
      `Campaign brainstorm`,
      `Content planning session`,
      `Analytics review`,
      `Social media strategy meeting`,
      `Brand workshop`,
    ]),
  Sales: () =>
    faker.helpers.arrayElement([
      `Client discovery call`,
      `Demo presentation`,
      `Sales pipeline review`,
      `Proposal discussion`,
      `Follow-up meeting`,
    ]),
  Support: () =>
    faker.helpers.arrayElement([
      `Customer onboarding call`,
      `Troubleshooting session`,
      `Support ticket review`,
      `Technical assistance`,
      `Escalation handling`,
    ]),
  Research: () =>
    faker.helpers.arrayElement([
      `User interview`,
      `Data analysis session`,
      `Research presentation`,
      `Findings review`,
      `Competitive analysis meeting`,
    ]),
  Planning: () =>
    faker.helpers.arrayElement([
      `Sprint planning`,
      `Roadmap discussion`,
      `Resource allocation meeting`,
      `Strategy session`,
      `Quarterly planning`,
    ]),
  Testing: () =>
    faker.helpers.arrayElement([
      `QA testing session`,
      `Bug triage meeting`,
      `Test plan review`,
      `Automation discussion`,
      `Performance testing`,
    ]),
  Documentation: () =>
    faker.helpers.arrayElement([
      `Documentation review`,
      `Writing session`,
      `Content sync`,
      `Knowledge sharing`,
      `API docs review`,
    ]),
  Deployment: () =>
    faker.helpers.arrayElement([
      `Deployment planning`,
      `Release review`,
      `Production sync`,
      `Rollback discussion`,
      `Infrastructure meeting`,
    ]),
}

/**
 * Generate contextual event title
 */
function generateEventTitle(categoryName?: string): string {
  if (!categoryName) return faker.lorem.words(3)
  const generator = CATEGORY_EVENT_GENERATORS[categoryName]
  return generator ? capitalize(generator()) : capitalize(faker.lorem.words(3))
}

/**
 * Rounds a date to the nearest 15-minute interval.
 * Useful for creating realistic event times (09:00, 09:15, 09:30, 09:45)
 *
 * @param date - Date to round
 * @returns Date rounded to nearest quarter hour
 *
 * @example
 * ```typescript
 * roundToQuarterHour(new Date('2026-01-05T09:07:00Z'))
 * // Returns: 2026-01-05T09:00:00Z
 *
 * roundToQuarterHour(new Date('2026-01-05T09:23:00Z'))
 * // Returns: 2026-01-05T09:30:00Z
 * ```
 */
function roundToQuarterHour(date: Date): Date {
  const ms = date.getTime()
  const fifteenMinutesInMs = 15 * 60 * 1000
  const rounded = Math.round(ms / fifteenMinutesInMs) * fifteenMinutesInMs
  return new Date(rounded)
}

/**
 * Creates a fake Event object with realistic data and relationships.
 *
 * @param overwrites - Partial Event to override default generated values
 * @param availableUsers - Pool of users that can be assigned as collaborators
 * @returns A complete Event object with fake data
 *
 * @example
 * ```typescript
 * // Generate random event
 * const event = createFakeEvent()
 *
 * // Generate event with specific title and status
 * const meeting = createFakeEvent({
 *   title: 'Team Meeting',
 *   status: EVENT_STATUS.ACTIVE
 * })
 * ```
 */
export function createFakeEvent(overwrites: Partial<Event> = {}, availableUsers?: User[]): Event {
  // Generate creator and collaborators
  const creator =
    overwrites.createdBy && typeof overwrites.createdBy === 'object'
      ? overwrites.createdBy
      : createFakeUser()

  // If availableUsers provided, pick random subset (1-3 users)
  // Otherwise, generate random users
  const thereAreAvailableUsers = availableUsers && availableUsers.length > 0
  const collaborators =
    overwrites.collaborators ??
    (thereAreAvailableUsers
      ? faker.helpers.arrayElements(
          availableUsers,
          faker.number.int({ min: 1, max: Math.min(3, availableUsers.length) })
        )
      : createFakeUsers(5))

  // Generate dates (start must be before end)
  const startDate = overwrites.start
    ? new Date(overwrites.start)
    : roundToQuarterHour(faker.date.soon({ days: 1 }))

  // Calculate end date: start + duration (rounded to quarters)
  // Duration: 1-8 hours in 15-minute increments
  const durationQuarters = faker.number.int({ min: 4, max: 32 }) // 4 = 1h, 32 = 8h
  const durationMs = durationQuarters * 15 * 60 * 1000
  const endDate = overwrites.end
    ? new Date(overwrites.end)
    : new Date(startDate.getTime() + durationMs)

  // Generate status
  const status = overwrites.status ?? faker.helpers.arrayElement(Object.values(EVENT_STATUS))

  const {
    id = faker.string.uuid(),
    title = faker.lorem.sentence({ min: 3, max: 8 }).replace('.', ''),
    start = startDate.toISOString(),
    end = endDate.toISOString(),
    notes = faker.lorem.paragraph(),
    taskId = faker.string.uuid(),
    task = undefined,
    createdAt = faker.date.past(),
    updatedAt = faker.date.recent(),
  } = overwrites

  return {
    id,
    title,
    start,
    end,
    notes,
    status,
    collaborators,
    taskId,
    task,
    createdBy: creator,
    createdAt,
    updatedAt,
  }
}

/**
 * Creates multiple fake Event objects.
 *
 * @param count - Number of events to generate
 * @param overwrites - Partial Event applied to all generated events
 * @param availableUsers - Pool of users that can be assigned as collaborators
 * @returns Array of Event objects
 *
 * @example
 * ```typescript
 * // Generate 5 random events
 * const events = createFakeEvents(5)
 *
 * // Generate 3 completed events
 * const completedEvents = createFakeEvents(3, { status: EVENT_STATUS.COMPLETED })
 * ```
 */
export function createFakeEvents(
  count: number,
  overwrites: Partial<Event> = {},
  availableUsers?: User[]
): Event[] {
  return Array.from({ length: count }, () => createFakeEvent(overwrites, availableUsers))
}

/**
 * Generates events for a task ensuring they don't overlap in time.
 * Events are created sequentially with gaps between them.
 *
 * @param count - Number of events to generate
 * @param overwrites - Partial Event applied to all generated events
 * @param availableUsers - Pool of users that can be assigned as collaborators
 * @returns Array of non-overlapping Event objects
 *
 * @example
 * ```typescript
 * // Generate 3 sequential events for a task
 * const events = createSequentialEvents(3, {}, taskParticipants)
 * // Event 1: 09:00-11:00
 * // Event 2: 11:30-13:30 (30 min gap)
 * // Event 3: 14:00-16:00 (30 min gap)
 * ```
 */
export function createSequentialEvents(
  count: number,
  overwrites: Partial<Event> = {},
  availableUsers?: User[],
  categoryName?: string
): Event[] {
  const events: Event[] = []
  let currentDate = roundToQuarterHour(faker.date.soon({ days: 1 }))

  for (let i = 0; i < count; i++) {
    // Random duration: 1-8 hours
    const durationHours = faker.number.int({ min: 1, max: 8 })
    const startDate = new Date(currentDate)
    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000)
    const status = overwrites.status ?? faker.helpers.arrayElement(Object.values(EVENT_STATUS))

    // Create event with calculated dates
    const event = createFakeEvent(
      {
        ...overwrites,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        title: generateEventTitle(categoryName),
        status,
      },
      availableUsers
    )

    events.push(event)

    // Next event starts after a gap (15-60 minutes)
    const gapMinutes = faker.helpers.arrayElement([15, 30, 45, 60])
    currentDate = new Date(endDate.getTime() + gapMinutes * 60 * 1000)
  }

  return events
}
