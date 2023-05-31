import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultProductFormValue,
} from '@/common/constants'
import { loadLS } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductInput from './ProductInput'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(defaultProductFormValue)
  const [isLoading, setIsLoading] = useState(false)

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
      actionTxt='Edit'
      handleAction={() => navigate(`/${Routes.PRODUCT}/${id}/edit`)}
      handleCancel={() => navigate(`/${Routes.PRODUCT}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Detail Product
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ProductInput isDetail formValue={formValue} isLoading={isLoading} />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default ProductDetail
