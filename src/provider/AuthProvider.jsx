import { BASE_URL, RestEndpoints } from '@/common/constants'
import { loadLS, removeLS, saveLS } from '@/common/utils'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(() => loadLS('token'))

  const login = (data) => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: `${BASE_URL}/${RestEndpoints.LOGIN}`,
      data,
    })
      .then((res) => {
        if (res.data) {
          const token = saveLS('token', res.data.token)

          setAuthenticated(token)

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

  const checkAuth = () => {
    const token = loadLS('token')

    if (!token) {
      setAuthenticated(false)
      navigate('/login', { replace: true })
      return
    }

    // @ts-ignore
    const { exp } = jwtDecode(token.value)

    const expirationTime = exp * 1000

    if (Date.now() >= expirationTime) {
      removeLS('token')
      setAuthenticated(false)
      navigate('/login', { replace: true })
    }
  }

  const value = useMemo(
    () => ({
      authenticated,
      login,
      logout,
      checkAuth,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
