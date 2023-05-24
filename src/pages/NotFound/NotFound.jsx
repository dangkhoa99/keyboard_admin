import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Grid
      container
      alignContent='center'
      rowSpacing={4}
      sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Grid item xs={12}>
        <Typography variant='h1' fontWeight='900'>
          404
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h4' fontWeight='600'>
          Page Not Found
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' fontWeight='400'>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button
          disableElevation
          variant='contained'
          size='large'
          color='primary'
          sx={{ fontWeight: 900 }}
          onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Grid>
    </Grid>
  )
}

export default NotFound
