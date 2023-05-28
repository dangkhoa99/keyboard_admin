import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultUserFormValue,
} from '@/common/constants'
import { loadLS } from '@/common/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserInput from './UserInput'
import Loading from '@/common/components/Loading'

const UserDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(defaultUserFormValue)
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
      url: `${BASE_URL}/${RestEndpoints.USER}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [user]: >>`, res.data)
        setFormValue(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [user]: >>`, err)
      })

    return () => {}
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FormWrapper
      actionTxt='Edit'
      handleAction={() => navigate(`/${Routes.USER}/${id}/edit`)}
      handleCancel={() => navigate(`/${Routes.USER}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Detail User
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UserInput isDetail formValue={formValue} isLoading={isLoading} />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}

export default UserDetail
