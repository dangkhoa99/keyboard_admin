import { useAuth } from '@/hooks/useAuth'
import { Button } from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Fragment>
      Dashboard Page
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
      <Button variant='outlined' onClick={() => navigate('/product')}>
        Product Page
      </Button>
    </Fragment>
  )
}

export default Dashboard
