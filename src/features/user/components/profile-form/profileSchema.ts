import { z } from 'zod'

const nameValidation = z
  .string()
  .min(2, 'Must be at least 2 characters')
  .max(50, 'Must be less than 50 characters')
  .regex(/^[a-zA-Z\s]*$/, 'Only letters are allowed')

export const profileSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: z.string().email().readonly(),
})

export type ProfileSchemaType = z.infer<typeof profileSchema>
