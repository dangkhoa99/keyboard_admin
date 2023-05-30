import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultProductFormValue,
} from '@/common/constants'
import { loadLS, setProductFormValueHelper, validateFileSize } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductInput from './ProductInput'

const ProductCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [createLoading, setCreateLoading] = useState(false)
  const [formValue, setFormValue] = useState(defaultProductFormValue)
  const [error, setError] = useState('')

  const onFormValueChange = useCallback((key, value) => {
    setProductFormValueHelper(key, value, setFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    console.log('[Submit] Product: >>', formValue)

    const token = loadLS('token')

    if (!token) {
      return
    }

    if (formValue.imageFiles.length === 0) {
      setCreateLoading(true)

      const { imageFiles, previewImages, ...other } = formValue

      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.PRODUCT}`,
        data: other,
      })
        .then((res) => {
          console.log(`[CREATE] [product]: >>`, res.data)

          setCreateLoading(false)
          enqueueSnackbar('Create Product Success', { variant: 'success' })
          navigate(`/${Routes.PRODUCT}`)
        })
        .catch((err) => {
          console.error(`[ERROR - CREATE] [product]: >>`, err)
        })

      return
    }

    // Validation form
    const validateImages = Array.from(formValue.imageFiles).every((image) =>
      validateFileSize(image),
    )

    // console.log('[validateImages]: ', validateImages)

    if (!validateImages) {
      setError('Invalid File Size. Maximum file size is 500KB.')
      return
    }

    const formData = new FormData()

    for (let i = 0; i < formValue.imageFiles.length; i++) {
      formData.append('images', formValue.imageFiles[i])
    }

    setCreateLoading(true)

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
        const { imageFiles, previewImages, ...other } = formValue

        const data = {
          ...other,
          images: res.data.map((item) => item),
        }

        console.log('[data]: ', data)

        axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token?.type} ${token?.value}`,
          },
          url: `${BASE_URL}/${RestEndpoints.PRODUCT}`,
          data,
        })
          .then((_res) => {
            console.log(`[CREATE] [product]: >>`, _res.data)

            setCreateLoading(false)
            enqueueSnackbar('Create Product Success', { variant: 'success' })
            navigate(`/${Routes.PRODUCT}`)
          })
          .catch((_err) => {
            console.error(`[ERROR - CREATE] [product]: >>`, _err)
          })
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [images]: >>`, err)
      })
  }

  return (
    <FormWrapper
      isLoading={createLoading}
      openBottomAction
      actionTxt='Create'
      handleAction={handleSubmit}
      handleCancel={() => navigate(`/${Routes.PRODUCT}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            New Product
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ProductInput
            formValue={formValue}
            onFormValueChange={onFormValueChange}
            isLoading={createLoading}
            error={error}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default ProductCreate
