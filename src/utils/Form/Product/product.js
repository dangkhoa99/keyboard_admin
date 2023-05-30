import { v4 as uuidv4 } from 'uuid'

export const setProductFormValueHelper = (key, value, setFormValue) => {
  switch (key) {
    case 'images':
      {
        console.log('[Images]>>', value.target.files)

        const imageFiles = value.target.files
        const previewImages =
          Array.from(imageFiles).map((image) => {
            const id = uuidv4()

            return {
              id,
              link: URL.createObjectURL(image),
              isNotUpload: true,
            }
          }) || []

        setFormValue((prev) => ({
          ...prev,
          imageFiles: [...prev['imageFiles'], ...imageFiles],
          previewImages: [...prev.previewImages, ...previewImages],
        }))
      }
      break
    case 'delete': {
      setFormValue((prev) => {
        const deletedId = prev.previewImages.findIndex(
          (item) => item.id === value,
        )

        console.log('Value: >>', value)
        console.log('deletedId: >>', deletedId)

        return {
          ...prev,
          imageFiles: prev.imageFiles.filter((_, index) => index !== deletedId),
          previewImages: prev.previewImages.filter(
            (_, index) => index !== deletedId,
          ),
        }
      })
      break
    }
    default:
      setFormValue((prev) => ({
        ...prev,
        [key]: value,
      }))
      break
  }
}
