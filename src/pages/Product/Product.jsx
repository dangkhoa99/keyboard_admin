import { useAuth } from '@/hooks/useAuth'
import { Button } from '@mui/material'
import { Fragment } from 'react'

const Product = () => {
  const { logout } = useAuth()
  return (
    <Fragment>
      Product Page
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
    </Fragment>
  )
}

export default Product
