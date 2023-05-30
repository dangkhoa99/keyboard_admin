import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultCategoryFormValue,
} from '@/common/constants'
import { loadLS, diffObject, setCategoryFormValueHelper } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryInput from './CategoryInput'
import { set } from 'lodash'

const CategoryUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  const navigate = useNavigate()

  const [originalFormValue, setOriginalFormValue] = useState(
    defaultCategoryFormValue,
  )
  const [formValue, setFormValue] = useState(defaultCategoryFormValue)
  const [isLoading, setIsLoading] = useState(false)

  const onFormValueChange = useCallback((key, value) => {
    setCategoryFormValueHelper(key, value, setFormValue)
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

    if (!diff.imageFile) {
      // Not Change/Remove Image
      axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.CATEGORY}/${id}`,
        data: diff,
      })
        .then(() => {
          // console.log(`[UPDATE] [category]: >>`, _res.data)

          setIsLoading(false)
          enqueueSnackbar('Update Category Success', {
            variant: 'success',
          })
          navigate(`/${Routes.CATEGORY}`)
        })
        .catch((_err) => {
          console.error(`[ERROR - UPDATE] [category]: >>`, _err)
        })
      return
    }

    if (diff.imageFile.length > 0) {
      // Change Image
      const formData = new FormData()

      formData.append('image', diff.imageFile[0])

      setIsLoading(true)

      axios({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.IMAGE}`,
        data: formData,
      })
        .then((res) => {
          const { imageFile, previewImage, ...other } = diff

          const data = {
            ...other,
            image: res.data._id,
          }

          axios({
            method: 'patch',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token?.type} ${token?.value}`,
            },
            url: `${BASE_URL}/${RestEndpoints.CATEGORY}/${id}`,
            data,
          })
            .then(() => {
              // console.log(`[UPDATE] [category]: >>`, _res.data)

              setIsLoading(false)
              enqueueSnackbar('Update Category Success', {
                variant: 'success',
              })
              navigate(`/${Routes.CATEGORY}`)
            })
            .catch((_err) => {
              console.error(`[ERROR - UPDATE] [category]: >>`, _err)
            })
        })
        .catch((err) => {
          console.error(`[ERROR - CREATE] [images]: >>`, err)
        })
    } else {
      // Remove Image
      const { imageFile, previewImage, ...other } = diff

      const data = {
        ...other,
        image: null,
      }

      axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token?.type} ${token?.value}`,
        },
        url: `${BASE_URL}/${RestEndpoints.CATEGORY}/${id}`,
        data,
      })
        .then(() => {
          // console.log(`[UPDATE] [category]: >>`, _res.data)

          setIsLoading(false)
          enqueueSnackbar('Update Category Success', {
            variant: 'success',
          })
          navigate(`/${Routes.CATEGORY}`)
        })
        .catch((_err) => {
          console.error(`[ERROR - UPDATE] [category]: >>`, _err)
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
      url: `${BASE_URL}/${RestEndpoints.CATEGORY}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [category]: >>`, res.data)
        setFormValue({
          ...res.data,
          image: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
          imageFile: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
          previewImage: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
        })
        setOriginalFormValue({
          ...res.data,
          image: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
          imageFile: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
          previewImage: res.data?.image
            ? [
                {
                  ...res.data.image,
                  id: res.data.image._id,
                },
              ]
            : [],
        })
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [category]: >>`, err)
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
      handleCancel={() => navigate(`/${Routes.CATEGORY}`)}
      disabledBtn={isLoading}
      openBottomAction>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Edit Category
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CategoryInput
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

export default CategoryUpdate
