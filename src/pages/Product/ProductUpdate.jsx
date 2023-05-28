import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultProductFormValue,
} from '@/common/constants'
import { loadLS } from '@/common/utils'
import { diffObject } from '@/common/utils/diffObject'
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
      url: `${BASE_URL}/${RestEndpoints.PRODUCT}/${id}`,
      data: diff,
    })
      .then(() => {
        // console.log(`[UPDATE] [product]: >>`, res.data)

        setIsLoading(false)
        enqueueSnackbar('Update Product Success', { variant: 'success' })
        navigate(`/${Routes.PRODUCT}`)
      })
      .catch((err) => {
        console.error(`[ERROR - UPDATE] [product]: >>`, err)
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
      url: `${BASE_URL}/${RestEndpoints.PRODUCT}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [product]: >>`, res.data)
        setFormValue(res.data)
        setOriginalFormValue(res.data)
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
