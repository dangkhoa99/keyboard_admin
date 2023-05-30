import { MAX_FILE_SIZE } from '@/common/constants'

export const validateFileSize = (file) => {
  const size = file?.size || 0
  const fileSizeKiloBytes = size / 1024

  return !(fileSizeKiloBytes > MAX_FILE_SIZE)
}
