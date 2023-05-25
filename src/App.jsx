import { MainLayout } from '@/common/layout/MainLayout'
import { PublicLayout } from '@/common/layout/PublicLayout'
import {
  Category,
  CategoryCreate,
  CategoryDetail,
  CategoryUpdate,
} from '@/pages/Category'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Login from '@/pages/Login/Login'
import NotFound from '@/pages/NotFound/NotFound'
import Order from '@/pages/Order/Order'
import Product from '@/pages/Product/Product'
import User from '@/pages/User/User'
import { AuthProvider } from '@/provider/AuthProvider'
import { lightTheme } from '@/themes'
import '@/themes/styles/App.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

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
              <Route path='categories' element={<Category />} />
              <Route path='categories/new' element={<CategoryCreate />} />
              <Route path='categories/:id/show' element={<CategoryDetail />} />
              <Route path='categories/:id/edit' element={<CategoryUpdate />} />
              <Route path='products' element={<Product />} />
              <Route path='users' element={<User />} />
              <Route path='orders' element={<Order />} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
