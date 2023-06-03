import { BASE_URL, RestEndpoints, Roles } from '@/common/constants'
import { loadLS, removeLS, saveLS } from '@/utils'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [authenticated, setAuthenticated] = useState(() => loadLS('token'))

  const login = (data, setError = undefined) => {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: `${BASE_URL}/${RestEndpoints.LOGIN}`,
      data,
    })
      .then((res) => {
        if (res.data) {
          if (res.data.role === Roles.USER) {
            enqueueSnackbar('Your account does not have permission to login', {
              variant: 'error',
            })
            return
          }

          const token = saveLS('token', res.data.token)

          setAuthenticated(token)

          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Login Failed')
      })
  }

  const logout = () => {
    removeLS('token')
    setAuthenticated(false)
    navigate('/login', { replace: true })
    enqueueSnackbar('Logout success', {
      variant: 'success',
    })
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
