import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email can not be empty.').email('Email is not valid.'),
  password: z.string().min(6, 'Password should have at least 6 characters'),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
