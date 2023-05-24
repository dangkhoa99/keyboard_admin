import { useAuth } from '@/hooks/useAuth'
import { Box, Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'

const Login = () => {
  const { login } = useAuth()

  const [formValue, setFormValue] = useState({ username: '', password: '' })

  const onFormChangeValue = (key, value) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleLogin = () => {
    console.log('Login: ', formValue)

    login(formValue)
  }

  return (
    <Box>
      <h1>Login</h1>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formValue.username}
            onChange={(e) => onFormChangeValue('username', e.target.value)}
            label='Username'
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formValue.password}
            onChange={(e) => onFormChangeValue('password', e.target.value)}
            label='Password'
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
