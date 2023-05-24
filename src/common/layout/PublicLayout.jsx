import { useAuth } from '@/hooks/useAuth'
import { Navigate, useOutlet } from 'react-router-dom'

export const PublicLayout = () => {
  const { authenticated } = useAuth()
  const outlet = useOutlet()

  if (authenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return <div>{outlet}</div>
}
