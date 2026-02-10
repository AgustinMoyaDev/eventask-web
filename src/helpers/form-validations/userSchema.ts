import { z } from 'zod'

const nameValidation = z
  .string()
  .min(2, 'Must be at least 2 characters')
  .max(50, 'Must be less than 50 characters')
  .regex(/^[a-zA-Z\s]*$/, 'Only letters are allowed')

export const userProfileSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: z.string().email().readonly(),
})

export type UserProfileSchemaType = z.infer<typeof userProfileSchema>
