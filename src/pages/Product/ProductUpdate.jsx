import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultProductFormValue,
} from '@/common/constants'
import {
  loadLS,
  diffObject,
  setProductFormValueHelper,
  validateFileSize,
} from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductInput from './ProductInput'

const ProductUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  const navigate = useNavigate()

  const [originalFormValue, setOriginalFormValue] = useState(
    defaultProductFormValue,
  )
  const [formValue, setFormValue] = useState(defaultProductFormValue)
  const [isLoading, setIsLoading] = useState(false)

  const onFormValueChange = useCallback((key, value) => {
    setProductFormValueHelper(key, value, setFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    const token = loadLS('token')

    if (!token) {
      return
    }

    const diff = diffObject(originalFormValue, formValue)
    // console.log('[originalFormValue]>>', originalFormValue)
    // console.log('[formValue]>>', formValue)
    // console.log('[DIFF]>>', diff)

    if (!diff) {
      return
    }

    if (!diff.imageFiles) {
      // Not Change/Remove Image
      axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.PRODUCT}/${id}`,
        data: diff,
      })
        .then(() => {
          // console.log(`[UPDATE] [product]: >>`, _res.data)

          setIsLoading(false)
          enqueueSnackbar('Update Product Success', {
            variant: 'success',
          })
          navigate(`/${Routes.PRODUCT}`)
        })
        .catch((_err) => {
          console.error(`[ERROR - UPDATE] [product]: >>`, _err)
        })
      return
    }

    if (diff.imageFiles.length > 0) {
      // Change Image
      const validateImages = Array.from(diff.imageFiles).every((image) =>
        validateFileSize(image),
      )

      if (!validateImages) {
        console.error('Invalid File Size. Maximum file size is 500KB.')
        return
      }

      const formData = new FormData()

      for (let i = 0; i < formValue.imageFiles.length; i++) {
        if (formValue.previewImages[i].isNotUpload) {
          formData.append('images', formValue.imageFiles[i])
        }
      }

      setIsLoading(true)

      axios({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.UPLOAD_IMAGES}`,
        data: formData,
      })
        .then((res) => {
          const { imageFiles, previewImages, images, ...other } = diff

          const data = {
            ...other,
            images: [
              ...previewImages.filter((item) => !item.isNotUpload),
              ...(res.data.map((item) => item._id) ?? []),
            ],
          }

          console.log('[data]: ', data)

          axios({
            method: 'patch',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token?.type} ${token?.value}`,
            },
            url: `${BASE_URL}/${RestEndpoints.PRODUCT}/${id}`,
            data,
          })
            .then((_res) => {
              console.log(`[UPDATE] [product]: >>`, _res.data)

              setIsLoading(false)
              enqueueSnackbar('Update Product Success', {
                variant: 'success',
              })
              navigate(`/${Routes.PRODUCT}`)
            })
            .catch((_err) => {
              console.error(`[ERROR - UPDATE] [product]: >>`, _err)
            })
        })
        .catch((err) => {
          console.error(`[ERROR - CREATE] [images]: >>`, err)
        })
    } else {
      // Remove Image
      const { imageFiles, previewImages, ...other } = diff

      const data = {
        ...other,
        images: [],
      }

      axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.PRODUCT}/${id}`,
        data,
      })
        .then((_res) => {
          console.log(`[UPDATE] [product]: >>`, _res.data)

          setIsLoading(false)
          enqueueSnackbar('Update Product Success', {
            variant: 'success',
          })
          navigate(`/${Routes.PRODUCT}`)
        })
        .catch((_err) => {
          console.error(`[ERROR - UPDATE] [product]: >>`, _err)
        })
    }
  }

  useEffect(() => {
    const token = loadLS('token')

    if (!token) {
      return
    }

    setIsLoading(true)

    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.PRODUCT}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [product]: >>`, res.data)
        setFormValue({
          ...res.data,
          images:
            res.data?.images?.map((image) => ({ ...image, id: image._id })) ??
            [],
          imageFiles:
            res.data?.images?.map((image) => ({ ...image, id: image._id })) ??
            [],
          previewImages:
            res.data?.images?.map((image) => ({ ...image, id: image._id })) ??
            [],
        })
        setOriginalFormValue({
          ...res.data,
          images:
            res.data?.images?.map((image) => ({ ...image, id: image._id })) ??
            [],
          imageFiles:
            res.data?.images?.map((image) => ({ ...image, id: image._id })) ??
            [],
          previewImages:
            res.data?.images?.map((image) => ({ ...image, id: image._id })) ??
            [],
        })
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [product]: >>`, err)
      })

    return () => {}
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FormWrapper
      actionTxt='Save'
      handleAction={handleSubmit}
      handleCancel={() => navigate(`/${Routes.PRODUCT}`)}
      disabledBtn={isLoading}
      openBottomAction>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Edit Product
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ProductInput
            isUpdate
            formValue={formValue}
            onFormValueChange={onFormValueChange}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default ProductUpdate
