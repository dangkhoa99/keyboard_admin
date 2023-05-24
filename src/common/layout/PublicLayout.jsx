import { useAuth } from '@/hooks/useAuth'
import { Box } from '@mui/material'
import { Fragment } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

export const PublicLayout = () => {
  const { authenticated } = useAuth()
  const outlet = useOutlet()

  if (authenticated) {
    return <Navigate to='/' replace />
  }

  return <Box sx={{ width: '100vw', height: '100vh' }}>{outlet}</Box>
}
