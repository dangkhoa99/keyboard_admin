import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { loadLS } from '@/utils'
import axios from 'axios'
import { BASE_URL, RestEndpoints, Routes } from '@/common/constants'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useAuth } from '@/hooks/useAuth'

const ChangePassword = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [formValue, setFormValue] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => {
    setIsShowPassword(!isShowPassword)
  }, [isShowPassword])

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

  const handleChangePassword = () => {
    // Validation form
    if (!formValue.currentPassword) {
      setError('Please enter current password')
      return
    }

    if (!formValue.newPassword) {
      setError('Please enter new password')
      return
    }

    if (!formValue.confirmPassword) {
      setError('Please enter confirm password')
      return
    }

    if (formValue.newPassword !== formValue.confirmPassword) {
      setError('Confirm password not match')
      return
    }

    // console.log('[Submit] Category: >>', formValue)

    const token = loadLS('token')

    if (!token) {
      return
    }

    const { confirmPassword, ...data } = formValue

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.CHANGE_PASSWORD}`,
      data,
    })
      .then((res) => {
        console.log(`[CHANGE] [password]: >>`, res.data)

        enqueueSnackbar('Change Password Success. Pleage login again.', {
          variant: 'success',
        })

        logout()
        navigate(`/${Routes.LOGIN}`)
      })
      .catch((err) => {
        setError(err.response.data.message || 'Change Password Failed')
      })
  }

  return (
    <Grid
      container
      justifyContent='center'
      rowSpacing={2}
      sx={{ width: '50%', m: '0 auto' }}>
      <Grid item xs={12}>
        <Typography
          variant='h4'
          fontWeight='900'
          sx={{ textTransform: 'uppercase' }}>
          Change Password
        </Typography>
      </Grid>

      {error && (
        <Grid item xs={12}>
          <Alert severity='error'>{error}</Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          size='medium'
          type={isShowPassword ? 'text' : 'password'}
          value={formValue.currentPassword}
          onChange={(e) => onFormValueChange('currentPassword', e.target.value)}
          label='Current Password'
          placeholder='Enter Current Password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip
                  title={isShowPassword ? 'Hide password' : 'Show password'}>
                  <span>
                    <IconButton onClick={toggleShowPassword} edge='end'>
                      {isShowPassword ? (
                        <VisibilityOff fontSize='medium' />
                      ) : (
                        <Visibility fontSize='medium' />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          size='medium'
          type={isShowPassword ? 'text' : 'password'}
          value={formValue.newPassword}
          onChange={(e) => onFormValueChange('newPassword', e.target.value)}
          label='New Password'
          placeholder='Enter New Password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip
                  title={isShowPassword ? 'Hide password' : 'Show password'}>
                  <span>
                    <IconButton onClick={toggleShowPassword} edge='end'>
                      {isShowPassword ? (
                        <VisibilityOff fontSize='medium' />
                      ) : (
                        <Visibility fontSize='medium' />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          size='medium'
          type={isShowPassword ? 'text' : 'password'}
          value={formValue.confirmPassword}
          onChange={(e) => onFormValueChange('confirmPassword', e.target.value)}
          label='Confirm New Password'
          placeholder='Enter Confirm New Password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip
                  title={isShowPassword ? 'Hide password' : 'Show password'}>
                  <span>
                    <IconButton onClick={toggleShowPassword} edge='end'>
                      {isShowPassword ? (
                        <VisibilityOff fontSize='medium' />
                      ) : (
                        <Visibility fontSize='medium' />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          disableElevation
          fullWidth
          size='large'
          variant='contained'
          sx={{ fontWeight: '900' }}
          onClick={handleChangePassword}>
          Change password
        </Button>
      </Grid>
    </Grid>
  )
}

export default ChangePassword
