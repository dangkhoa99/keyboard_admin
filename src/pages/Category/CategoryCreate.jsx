import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultCategoryFormValue,
} from '@/common/constants'
import { loadLS } from '@/utils'
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
    switch (key) {
      default:
        setFormValue((prev) => ({
          ...prev,
          [key]: value,
        }))
        break
    }
  }, [])

  const clearFormValue = useCallback(() => {
    setFormValue(defaultCategoryFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    console.log('[Submit] Category: >>', formValue)

    const token = loadLS('token')

    if (!token) {
      return
    }

    setCreateLoading(true)

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.CATEGORY}`,
      data: formValue,
    })
      .then((res) => {
        console.log(`[CREATE] [category]: >>`, res.data)

        setCreateLoading(false)
        enqueueSnackbar('Create Category Success', { variant: 'success' })
        clearFormValue()
        navigate(`/${Routes.CATEGORY}`)
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [category]: >>`, err)
      })
  }

  return (
    <FormWrapper
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
