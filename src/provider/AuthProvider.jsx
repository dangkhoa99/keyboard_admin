import { BASE_URL, RestEndpoints } from '@/common/constants'
import { loadLS, removeLS, saveLS } from '@/common/utils'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)

  const login = (data) => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: `${BASE_URL}/${RestEndpoints.LOGIN}`,
      data,
    })
      .then((res) => {
        if (res.data) {
          saveLS('token', res.data.token)

          setAuthenticated(true)

          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        console.error('Login: ', err)
      })
  }

  const logout = () => {
    removeLS('token')
    setAuthenticated(false)
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      authenticated,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authenticated],
  )

  useEffect(() => {
    const token = loadLS('token')

    if (token) {
      setAuthenticated(true)
    }

    return () => {}
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
