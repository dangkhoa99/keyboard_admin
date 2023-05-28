import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultOrderFormValue,
} from '@/common/constants'
import { loadLS, setOrderFormValueHelper } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderInput from './OrderInput'

const OrderCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [createLoading, setCreateLoading] = useState(false)
  const [formValue, setFormValue] = useState(defaultOrderFormValue)
  const [error, setError] = useState('')

  const onFormValueChange = useCallback((key, value) => {
    setError(undefined)
    setOrderFormValueHelper(key, value, setFormValue)
  }, [])

  const clearFormValue = useCallback(() => {
    setFormValue(defaultOrderFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    console.log('[Submit] Order: >>', formValue)

    const token = loadLS('token')

    if (!token) {
      return
    }

    const formatData = {
      ...formValue,
      products: formValue.products.filter((product) => product.product),
    }

    console.log('Remove product no name: >>', formatData)

    setCreateLoading(true)

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.ORDER}`,
      data: formatData,
    })
      .then((res) => {
        console.log(`[CREATE] [order]: >>`, res.data)

        setCreateLoading(false)
        enqueueSnackbar('Create Order Success', { variant: 'success' })
        clearFormValue()
        navigate(`/${Routes.ORDER}`)
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [order]: >>`, err)
      })
  }

  return (
    <FormWrapper
      openBottomAction
      actionTxt='Create'
      handleAction={handleSubmit}
      handleCancel={() => navigate(`/${Routes.ORDER}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            New Order
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <OrderInput
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

export default OrderCreate