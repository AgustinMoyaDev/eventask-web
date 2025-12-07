import { FormValidations } from '@/hooks/useForm'
import { IUserForm } from '@/types/IUser'

export const userFormFields: IUserForm = {
  firstName: '',
  lastName: '',
  email: '',
  profileImageURL: '',
  contacts: [],
}

export const userFormValidations: FormValidations<typeof userFormFields> = {
  email: [[value => !value, 'Email is required.']],
  firstName: [[value => !value, 'First name is required.']],
  lastName: [[value => !value, 'Last name is required.']],
  profileImageURL: [],
  contacts: [],
}
