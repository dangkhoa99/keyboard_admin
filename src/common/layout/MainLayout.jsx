import { useAuth } from '@/hooks/useAuth'
import { Navigate, useOutlet } from 'react-router-dom'
import MainWrapper from './MainWrapper'
import { useEffect } from 'react'

export const MainLayout = () => {
  const { authenticated, checkAuth } = useAuth()

  const outlet = useOutlet()

  useEffect(() => {
    checkAuth()

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!authenticated) {
    return <Navigate to='/login' />
  }

  return <MainWrapper>{outlet}</MainWrapper>
}
