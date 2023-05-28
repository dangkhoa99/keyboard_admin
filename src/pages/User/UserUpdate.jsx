import FormWrapper from '@/common/components/FormWrapper'
import Loading from '@/common/components/Loading'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultUserFormValue,
} from '@/common/constants'
import { loadLS } from '@/utils'
import { diffObject } from '@/utils/diffObject'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserInput from './UserInput'

const UserUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  const navigate = useNavigate()

  const [originalFormValue, setOriginalFormValue] =
    useState(defaultUserFormValue)
  const [formValue, setFormValue] = useState(defaultUserFormValue)
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
      url: `${BASE_URL}/${RestEndpoints.USER}/${id}`,
      data: diff,
    })
      .then(() => {
        // console.log(`[UPDATE] [user]: >>`, res.data)

        setIsLoading(false)
        enqueueSnackbar('Update User Success', { variant: 'success' })
        navigate(`/${Routes.USER}`)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(`[ERROR - UPDATE] [user]: >>`, err)
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
      url: `${BASE_URL}/${RestEndpoints.USER}/${id}`,
    })
      .then((res) => {
        // console.log(`[GET ID] [User]: >>`, res.data)
        setFormValue(res.data)
        setOriginalFormValue(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`[ERROR - GET ID] [User]: >>`, err)
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
      handleCancel={() => navigate(`/${Routes.USER}`)}
      disabledBtn={isLoading}
      openBottomAction>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            Edit User
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UserInput
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

export default UserUpdate
