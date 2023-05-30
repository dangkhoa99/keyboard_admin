import { v4 as uuidv4 } from 'uuid'

export const setCategoryFormValueHelper = (key, value, setFormValue) => {
  switch (key) {
    case 'image':
      {
        console.log('[Image]>>', value.target.files)

        const id = uuidv4()

        const imageFiles = value.target.files
        const previewImages =
          Array.from(imageFiles).map((image) => ({
            id,
            link: URL.createObjectURL(image),
          })) || []

        setFormValue((prev) => ({
          ...prev,
          imageFile: [...prev['imageFile'], ...imageFiles],
          previewImage: [...prev.previewImage, ...previewImages],
        }))
      }
      break
    case 'delete': {
      setFormValue((prev) => {
        const deletedId = prev.previewImage.findIndex(
          (item) => item.id === value,
        )

        // console.log('Value: >>', value)
        // console.log('deletedId: >>', deletedId)

        return {
          ...prev,
          imageFile: prev.imageFile.filter((_, index) => index !== deletedId),
          previewImage: prev.previewImage.filter(
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
