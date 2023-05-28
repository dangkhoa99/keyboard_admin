import { BASE_URL, RestEndpoints, Statuses } from '@/common/constants'
import { loadLS } from '@/utils'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

const Dashboard = () => {
  const [pendingOrder, setPendingOrder] = useState({
    total: 0,
    isLoading: false,
  })

  useEffect(() => {
    const token = loadLS('token')

    if (!token) {
      return
    }

    setPendingOrder((prev) => ({ ...prev, isLoading: true }))

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token?.type} ${token?.value}`,
      },
      url: `${BASE_URL}/${RestEndpoints.ORDER}/count`,
      data: { status: Statuses.PENDING },
    })
      .then((res) => {
        if (res.data) {
          setPendingOrder({ total: res.data.count, isLoading: false })
        }
      })
      .catch((err) => {
        console.error('[ERROR - whoAmI]: ', err)
      })

    return () => {}
  }, [])

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
            <Paper
              variant='outlined'
              sx={{ p: 2, width: '25%', minWidth: '300px' }}>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  sx={{ textAlign: 'start', position: 'relative' }}>
                  <ReceiptLongIcon sx={{ fontSize: '50px' }} />
                </Grid>

                <Grid item xs={8}>
                  <Typography variant='h5' textAlign='end' fontWeight='600'>
                    Pending Orders
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='h3' textAlign='end' fontWeight='900'>
                    {pendingOrder.total}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Dashboard
