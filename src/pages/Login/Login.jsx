import { useAuth } from '@/hooks/useAuth'
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material'
import { useCallback, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Login = () => {
  const { login } = useAuth()

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [formValue, setFormValue] = useState({ username: '', password: '' })

  const toggleShowPassword = useCallback(() => {
    setIsShowPassword(!isShowPassword)
  }, [isShowPassword])

  const onFormChangeValue = useCallback((key, value) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const handleLogin = useCallback(() => {
    login(formValue)
  }, [formValue, login])

  const handlePressEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleLogin()
      }
    },
    [handleLogin],
  )

  return (
    <Grid
      container
      alignContent='center'
      gap={4}
      sx={{ height: '100%', width: '550px', m: '0 auto' }}>
      <Grid item xs={12}>
        <Typography variant='h3' fontWeight='900'>
          {`Khoa's Store - Admin`}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          size='medium'
          value={formValue.username}
          onChange={(e) => onFormChangeValue('username', e.target.value)}
          label='Username'
          placeholder='Enter your username'
          onKeyUp={handlePressEnter}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          size='medium'
          type={isShowPassword ? 'text' : 'password'}
          value={formValue.password}
          onChange={(e) => onFormChangeValue('password', e.target.value)}
          label='Password'
          placeholder='Enter your password'
          onKeyUp={handlePressEnter}
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
          fullWidth
          variant='contained'
          size='large'
          sx={{ fontWeight: 900 }}
          onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  )
}

export default Login
