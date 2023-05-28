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
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInput from './UserInput'
import { convertDataToPayload } from '@/common/utils/convertDataToPayload'

const UserCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [createLoading, setCreateLoading] = useState(false)
  const [formValue, setFormValue] = useState(defaultUserFormValue)
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
    setFormValue(defaultUserFormValue)
  }, [])

  const handleSubmit = () => {
    // Validation form

    // console.log('[Submit] User: >>', formValue)

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
      url: `${BASE_URL}/${RestEndpoints.USER}`,
      data: convertDataToPayload(formValue),
    })
      .then((res) => {
        // console.log(`[CREATE] [User]: >>`, res.data)

        setCreateLoading(false)
        enqueueSnackbar('Create User Success', { variant: 'success' })
        clearFormValue()
        navigate(`/${Routes.USER}`)
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [User]: >>`, err)
      })
  }

  return (
    <FormWrapper
      openBottomAction
      actionTxt='Create'
      handleAction={handleSubmit}
      handleCancel={() => navigate(`/${Routes.USER}`)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            fontWeight='600'
            sx={{ textTransform: 'uppercase' }}>
            New User
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UserInput
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

export default UserCreate
