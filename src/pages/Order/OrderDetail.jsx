import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultOrderFormValue,
} from '@/common/constants'
import { loadLS } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderInput from './OrderInput'
import Loading from '@/common/components/Loading'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(defaultOrderFormValue)
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
      url: `${BASE_URL}/${RestEndpoints.ORDER}/${id}`,
    })
      .then((res) => {
        console.log(`[GET ID] [order]: >>`, res.data)
        setFormValue(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [order]: >>`, err)
      })

    return () => {}
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FormWrapper
      actionTxt='Edit'
      handleAction={() => navigate(`/${Routes.ORDER}/${id}/edit`)}
      handleCancel={() => navigate(`/${Routes.ORDER}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Detail Order
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <OrderInput isDetail formValue={formValue} isLoading={isLoading} />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default OrderDetail
