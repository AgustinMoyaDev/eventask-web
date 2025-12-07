import { FormValidations } from '@/hooks/useForm'

import { emailRegex } from '../getValidEmail'

export const forgotPasswordFields = {
  email: '',
}

export const forgotPasswordFormValidations: FormValidations<typeof forgotPasswordFields> = {
  email: [
    [value => value.trim() === '', 'Email can not be empty.'],
    [value => !emailRegex.test(value), 'Email is not valid.'],
  ],
}
