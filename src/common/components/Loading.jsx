import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ width: '100%', height: '100%' }}>
      <CircularProgress />
    </Grid>
  )
}

export default Loading
