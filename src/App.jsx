import { MainLayout } from '@/common/layout/MainLayout'
import { PublicLayout } from '@/common/layout/PublicLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Login from '@/pages/Login/Login'
import Product from '@/pages/Product/Product'
import { AuthProvider } from '@/provider/AuthProvider'
import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import '@/themes/styles/App.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from '@/themes'

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className='App'>
        <AuthProvider>
          <Routes>
            <Route path='*' element={<NotFound />} />

            <Route element={<PublicLayout />}>
              <Route path='/login' element={<Login />} />
            </Route>

            <Route path='/' element={<MainLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='product' element={<Product />} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
