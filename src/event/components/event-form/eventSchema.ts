import { z } from 'zod'
import dayjs from 'dayjs'

const MAX_EVENT_HOURS = 8

const createDateTimeSchema = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required.`)
    .refine(val => dayjs(val).isValid(), 'Invalid date format.')
    .refine(val => dayjs(val).minute() % 15 === 0, 'Time must be in 15-minute increments.')

export const eventSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required.'),
    start: createDateTimeSchema('Start date'),
    end: createDateTimeSchema('End date'),
    notes: z.string().trim().min(1, 'Notes are required.'),
  })
  .superRefine((data, ctx) => {
    const start = dayjs(data.start)
    const end = dayjs(data.end)

    if (start.isAfter(end)) {
      ctx.addIssue({
        code: 'custom',
        message: 'The start date cannot be later than the end date.',
        path: ['start'],
      })
      ctx.addIssue({
        code: 'custom',
        message: 'The end date cannot be earlier than the start date.',
        path: ['end'],
      })
      return
    }

    if (end.diff(start, 'hours', true) > MAX_EVENT_HOURS) {
      ctx.addIssue({
        code: 'custom',
        message: 'The event cannot last longer than 8 hours.',
        path: ['end'],
      })
    }
  })

export type EventSchemaType = z.infer<typeof eventSchema>
