import { AuthContext } from '@/context/AuthContext'
import { Fragment, useContext } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import MainWrapper from './MainWrapper'

export const MainLayout = () => {
  const { authenticated } = useContext(AuthContext)

  const outlet = useOutlet()

  if (!authenticated) {
    return <Navigate to='/login' />
  }

  return <MainWrapper>{outlet}</MainWrapper>
}
