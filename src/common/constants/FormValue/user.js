import { Genders, Roles } from '../constants'

export const defaultUserFormValue = {
  name: '',
  phone: '',
  email: '',
  address: '',
  gender: Genders.OTHER,
  role: Roles.ADMIN,
  username: '',
  password: '',
}
