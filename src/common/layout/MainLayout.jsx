import { AuthContext } from '@/context/AuthContext'
import { Fragment, useContext } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

export const MainLayout = () => {
  const { authenticated } = useContext(AuthContext)

  const outlet = useOutlet()

  if (!authenticated) {
    return <Navigate to='/login' />
  }

  return <Fragment>{outlet}</Fragment>
}
