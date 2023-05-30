import isEqual from 'lodash/isEqual'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

export const diffObject = (prev, next) => {
  const diff = {}

  for (const key in next) {
    // Check Array
    if (isArray(prev[key])) {
      // console.log('[isEqual]>> ', !isEqual(next[key], prev[key]))
      if (!isEqual(next[key], prev[key])) {
        diff[key] = next[key]
      }

      continue
    }

    // Check Object
    if (prev[key] === Object(prev[key])) {
      if (JSON.stringify(next[key]) !== JSON.stringify(prev[key])) {
        diff[key] = { ...next[key] }
      } else continue
    }

    // Check normal value
    if (prev[key] != next[key]) {
      diff[key] = next[key]
    }
  }

  return isEmpty(diff) ? null : diff
}
