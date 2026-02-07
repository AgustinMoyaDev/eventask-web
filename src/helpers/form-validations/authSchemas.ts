/**
 * Zod validation schemas for authentication forms.
 *
 * @module authSchemas
 */

import { z } from 'zod'

const emailValidation = z
  .string('Email is required')
  .trim()
  .min(1, 'Email can not be empty.')
  .email('Email is not valid.')

const passwordValidation = z
  .string('Password is required')
  .min(6, 'Password should have at least 6 characters')

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
})

// --- LOGIN ---
export type LoginSchemaType = z.infer<typeof loginSchema>

// --- REGISTER ---
export const registerSchema = z
  .object({
    firstName: z
      .string('First name is required')
      .trim()
      .min(1, 'First name can not be empty.')
      .min(2, 'First name must be at least 2 characters.'),

    lastName: z
      .string('Last name is required')
      .trim()
      .min(1, 'Last name can not be empty.')
      .min(2, 'Last name must be at least 2 characters.'),

    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>

// --- FORGOT PASSWORD ---
export const forgotPasswordSchema = z.object({
  email: emailValidation,
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

// --- RESET PASSWORD ---
export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

// --- CHANGE PASSWORD ---
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>

export const setPasswordSchema = z
  .object({
    newPassword: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SetPasswordSchemaType = z.infer<typeof setPasswordSchema>
