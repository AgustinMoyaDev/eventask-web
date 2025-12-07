import { FormValidations } from '@/hooks/useForm'

import { emailRegex } from '../getValidEmail'

export const registerFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export const registerFormValidations: FormValidations<typeof registerFormFields> = {
  firstName: [[value => value.trim().length === 0, 'Name is required.']],
  lastName: [[value => value.trim().length === 0, 'Last name is required.']],
  email: [
    [value => value.trim() === '', 'Email can not be empty.'],
    [value => !emailRegex.test(value), 'Email is not valid.'],
  ],
  password: [[value => value.trim().length < 6, 'Password should have at least 6 characters']],
}
