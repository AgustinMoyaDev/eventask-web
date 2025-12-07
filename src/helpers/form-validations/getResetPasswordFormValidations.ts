import { FormValidations } from '@/hooks/useForm'

export const resetPasswordFields = {
  newPassword: '',
  repeatPassword: '',
}

export const resetPasswordFormValidations: FormValidations<typeof resetPasswordFields> = {
  newPassword: [
    [value => value.trim() === '', 'Password can not be empty.'],
    [value => value.length < 6, 'Password must be at least 6 characters long.'],
  ],
  repeatPassword: [
    [value => value.trim() === '', 'Repeat password can not be empty.'],
    [(value, { newPassword }) => value !== newPassword, 'Passwords must match.'],
  ],
}
