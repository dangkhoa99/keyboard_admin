import { MAX_FILE_SIZE } from '@/common/constants'

export const validateFileSize = (file) => {
  const fileSizeKiloBytes = file.size / 1024

  return !(fileSizeKiloBytes > MAX_FILE_SIZE)
}
