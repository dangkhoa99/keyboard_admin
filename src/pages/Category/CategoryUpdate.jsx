import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultCategoryFormValue,
} from '@/common/constants'
import { loadLS, diffObject } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryInput from './CategoryInput'

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
    switch (key) {
      default:
        setFormValue((prev) => ({
          ...prev,
          [key]: value,
        }))
        break
    }
  }, [])

  const handleSubmit = () => {
    // Validation form

    const token = loadLS('token')

    if (!token) {
      return
    }

    const diff = diffObject(originalFormValue, formValue)

    if (!diff) {
      return
    }

    setIsLoading(true)

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
        // console.log(`[UPDATE] [category]: >>`, res.data)

        setIsLoading(false)
        enqueueSnackbar('Update Category Success', { variant: 'success' })
        navigate(`/${Routes.CATEGORY}`)
      })
      .catch((err) => {
        console.error(`[ERROR - UPDATE] [category]: >>`, err)
      })
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
        setFormValue(res.data)
        setOriginalFormValue(res.data)
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
