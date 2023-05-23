import { useAuth } from '@/hooks/useAuth'
import { Button } from '@mui/material'
import { Fragment } from 'react'

const Dashboard = () => {
  const { logout } = useAuth()
  return (
    <Fragment>
      Dashboard Page
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
    </Fragment>
  )
}

export default Dashboard
