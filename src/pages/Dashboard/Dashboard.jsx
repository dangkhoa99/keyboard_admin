import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Paper variant='outlined' sx={{ p: 2, backgroundColor: '#fff' }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4' fontWeight='900' textAlign='start'>
              Dashboard
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' textAlign='start'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus aspernatur cum doloremque temporibus fugiat! Commodi,
              velit dolore qui vero alias voluptate, nulla laboriosam minima est
              molestias sit quidem? Velit, at. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              et dolorem perferendis culpa saepe quam perspiciatis natus
              deserunt fugit ratione, ipsa animi eligendi magnam in quis
              expedita nesciunt nemo dignissimos!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Dashboard
