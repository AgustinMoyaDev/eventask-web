import { faker } from '@faker-js/faker'

import { EVENT_STATUS, EventStatus, IEvent } from '@/types/IEvent'
import { IUser } from '@/types/IUser'

import { createFakeUser, createFakeUsers } from './userFactory'

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
 * Creates a fake IEvent object with realistic data and relationships.
 *
 * @param overwrites - Partial IEvent to override default generated values
 * @param availableUsers - Pool of users that can be assigned as collaborators
 * @returns A complete IEvent object with fake data
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
export function createFakeEvent(
  overwrites: Partial<IEvent> = {},
  availableUsers?: IUser[]
): IEvent {
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
  const status: EventStatus =
    overwrites.status ?? faker.helpers.arrayElement(Object.values(EVENT_STATUS))

  const {
    id = faker.string.uuid(),
    title = faker.lorem.sentence({ min: 3, max: 8 }).replace('.', ''),
    start = startDate.toISOString(),
    end = endDate.toISOString(),
    notes = faker.lorem.paragraph(),
    taskId = undefined,
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
 * Creates multiple fake IEvent objects.
 *
 * @param count - Number of events to generate
 * @param overwrites - Partial IEvent applied to all generated events
 * @param availableUsers - Pool of users that can be assigned as collaborators
 * @returns Array of IEvent objects
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
  overwrites: Partial<IEvent> = {},
  availableUsers?: IUser[]
): IEvent[] {
  return Array.from({ length: count }, () => createFakeEvent(overwrites, availableUsers))
}

/**
 * Generates events for a task ensuring they don't overlap in time.
 * Events are created sequentially with gaps between them.
 *
 * @param count - Number of events to generate
 * @param overwrites - Partial IEvent applied to all generated events
 * @param availableUsers - Pool of users that can be assigned as collaborators
 * @returns Array of non-overlapping IEvent objects
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
  overwrites: Partial<IEvent> = {},
  availableUsers?: IUser[]
): IEvent[] {
  const events: IEvent[] = []
  let currentDate = roundToQuarterHour(faker.date.soon({ days: 1 }))

  for (let i = 0; i < count; i++) {
    // Random duration: 1-8 hours
    const durationHours = faker.number.int({ min: 1, max: 8 })
    const startDate = new Date(currentDate)
    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000)

    // Create event with calculated dates
    const event = createFakeEvent(
      {
        ...overwrites,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
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
