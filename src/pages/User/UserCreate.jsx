import FormWrapper from '@/common/components/FormWrapper'
import {
  BASE_URL,
  RestEndpoints,
  Routes,
  defaultUserFormValue,
} from '@/common/constants'
import { convertDataToPayload, loadLS } from '@/utils'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInput from './UserInput'

const UserCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [createLoading, setCreateLoading] = useState(false)
  const [formValue, setFormValue] = useState(defaultUserFormValue)
  const [error, setError] = useState('')

  const onFormValueChange = useCallback((key, value) => {
    setError(undefined)
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
    if (!formValue.username) {
      setError('Username is required')
      return
    }

    if (!formValue.password) {
      setError('Password is required')
      return
    }

    if (!formValue.name) {
      setError('Name is required')
      return
    }

    if (!formValue.role) {
      setError('Role is required')
      return
    }

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
      .then(() => {
        // console.log(`[CREATE] [User]: >>`, res.data)

        enqueueSnackbar('Create User Success', { variant: 'success' })
        navigate(`/${Routes.USER}`)
      })
      .catch((err) => {
        console.error(`[ERROR - CREATE] [User]: >>`, err)
        setError(err?.response?.data?.message || 'Create User Failed')
      })

    setCreateLoading(false)
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
