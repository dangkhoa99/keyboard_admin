import { useAuth } from '@/hooks/useAuth'
import { Button } from '@mui/material'
import React from 'react'

const LogoutBtn = () => {
  const { logout } = useAuth()

  return (
    <Button
      disableElevation
      variant='outlined'
      onClick={logout}
      color='inherit'
      size='medium'
      sx={{ fontWeight: 900 }}>
      Logout
    </Button>
  )
}

export default LogoutBtn
