import { FormValidations } from '@/hooks/useForm'

export const setPasswordFields = {
  newPassword: '',
  confirmPassword: '',
}

export const setPasswordFormValidations: FormValidations<typeof setPasswordFields> = {
  newPassword: [
    [value => value.trim() === '', 'Password can not be empty.'],
    [value => value.length < 6, 'Password must be at least 6 characters long.'],
  ],
  confirmPassword: [
    [value => value.trim() === '', 'Confirm password can not be empty.'],
    [(value, { newPassword }) => value !== newPassword, 'Passwords must match.'],
  ],
}
