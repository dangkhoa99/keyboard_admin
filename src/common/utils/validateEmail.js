import { regexEmail } from '../constants'

export const validateEmail = (email) => {
  return String(email).toLowerCase().match(regexEmail)
}
