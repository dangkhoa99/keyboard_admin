import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultCategoryFormValue,
} from '@/common/constants'
import { loadLS, setCategoryFormValueHelper, validateFileSize } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryInput from './CategoryInput'

const CategoryCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [createLoading, setCreateLoading] = useState(false)
  const [formValue, setFormValue] = useState(defaultCategoryFormValue)
  const [error, setError] = useState('')

  const onFormValueChange = useCallback((key, value) => {
    setCategoryFormValueHelper(key, value, setFormValue)
  }, [])

  const handleSubmit = () => {
    // console.log('[Submit] Category: >>', formValue)

    const token = loadLS('token')

    if (!token) {
      return
    }

    if (formValue.imageFile.length === 0) {
      setCreateLoading(true)

      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.CATEGORY}`,
        data: {
          name: formValue.name,
          description: formValue.description,
        },
      })
        .then(() => {
          // console.log(`[CREATE] [category]: >>`, res.data)

          setCreateLoading(false)
          enqueueSnackbar('Create Category Success', { variant: 'success' })
          navigate(`/${Routes.CATEGORY}`)
        })
        .catch((err) => {
          console.error(`[ERROR - CREATE] [category]: >>`, err)
        })

      return
    }

    // Validation form
    const validateImages = Array.from(formValue.imageFile).every((image) =>
      validateFileSize(image),
    )

    // console.log('[validateImages]: ', validateImages)

    if (!validateImages) {
      setError('Invalid File Size. Maximum file size is 500KB.')
      return
    }

    const formData = new FormData()

    formData.append('image', formValue.imageFile[0])

    setCreateLoading(true)

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.UPLOAD_IMAGE}`,
      data: formData,
    })
      .then((res) => {
        const data = {
          name: formValue.name,
          description: formValue.description,
          image: res.data._id,
        }

        axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token?.type} ${token?.value}`,
          },
          url: `${BASE_URL}/${RestEndpoints.CATEGORY}`,
          data,
        })
          .then(() => {
            // console.log(`[CREATE] [category]: >>`, _res.data)

            setCreateLoading(false)
            enqueueSnackbar('Create Category Success', { variant: 'success' })
            navigate(`/${Routes.CATEGORY}`)
          })
          .catch((_err) => {
            console.error(`[ERROR - CREATE] [category]: >>`, _err)
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
      handleCancel={() => navigate(`/${Routes.CATEGORY}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            New Category
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CategoryInput
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

export default CategoryCreate
