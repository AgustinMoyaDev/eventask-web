import { FormValidations } from '@/hooks/useForm'

export const changePasswordFields = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const changePasswordFormValidations: FormValidations<typeof changePasswordFields> = {
  currentPassword: [[value => value.trim() === '', 'Current password can not be empty.']],
  newPassword: [
    [value => value.trim() === '', 'Password can not be empty.'],
    [value => value.length < 6, 'Password must be at least 6 characters long.'],
  ],
  confirmPassword: [
    [value => value.trim() === '', 'Repeat password can not be empty.'],
    [(value, { newPassword }) => value !== newPassword, 'Passwords must match.'],
  ],
}
