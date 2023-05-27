import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultProductFormValue,
} from '@/common/constants'
import { loadLS } from '@/common/utils'
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
    setFormValue(defaultProductFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    console.log('[Submit] Product: >>', formValue)

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
      url: `${BASE_URL}/${RestEndpoints.PRODUCT}`,
      data: formValue,
    })
      .then((res) => {
        console.log(`[CREATE] [product]: >>`, res.data)

        setCreateLoading(false)
        enqueueSnackbar('Create Product Success', { variant: 'success' })
        clearFormValue()
        navigate(`/${Routes.PRODUCT}`)
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [product]: >>`, err)
      })
  }

  return (
    <FormWrapper
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
