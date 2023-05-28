import { regexEmail } from '../common/constants'

export const validateEmail = (email) => {
  return String(email).toLowerCase().match(regexEmail)
}
