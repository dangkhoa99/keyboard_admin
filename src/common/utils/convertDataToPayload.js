export const convertDataToPayload = (formValue) => {
  const rs = {}

  // Only input fields -> Payload
  Object.entries(formValue).forEach(([key, value]) => {
    if (value) {
      rs[key] = value
    }
  })

  return rs
}
