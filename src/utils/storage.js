export const saveLS = (key, value) => {
  if (!Storage) {
    return false
  }

  localStorage.setItem(key, JSON.stringify(value))

  return value
}

export const loadLS = (key) => {
  if (!Storage) {
    return false
  }

  try {
    const item = localStorage.getItem(key)

    if (item) {
      const record = JSON.parse(item)

      if (!record) {
        return false
      }

      return record
    }
  } catch (e) {
    return false
  }
}

export const updateLS = (key, value) => {
  if (!Storage) {
    return false
  }

  try {
    const item = localStorage.getItem(key)

    if (item) {
      const record = JSON.parse(item)

      if (!record) {
        return false
      }

      localStorage.setItem(key, JSON.stringify(value))

      return value
    }
  } catch (e) {
    return false
  }
}

export const removeLS = (key) => {
  if (!Storage) {
    return false
  }

  localStorage.removeItem(key)
}
