import { MainLayout, PublicLayout } from '@/common/layout'
import {
  Category,
  CategoryCreate,
  CategoryDetail,
  CategoryUpdate,
} from '@/pages/Category'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Login from '@/pages/Login/Login'
import NotFound from '@/pages/NotFound/NotFound'
import { Order, OrderCreate, OrderDetail, OrderUpdate } from '@/pages/Order'
import {
  Product,
  ProductCreate,
  ProductDetail,
  ProductUpdate,
} from '@/pages/Product'
import { User, UserCreate, UserDetail, UserUpdate } from '@/pages/User'
import { AuthProvider } from '@/provider/AuthProvider'
import { lightTheme } from '@/themes'
import '@/themes/styles/App.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <SnackbarProvider
        dense
        preventDuplicate
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
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
                <Route
                  path='categories/:id/show'
                  element={<CategoryDetail />}
                />
                <Route
                  path='categories/:id/edit'
                  element={<CategoryUpdate />}
                />
                <Route path='products' element={<Product />} />
                <Route path='products/new' element={<ProductCreate />} />
                <Route path='products/:id/show' element={<ProductDetail />} />
                <Route path='products/:id/edit' element={<ProductUpdate />} />
                <Route path='users' element={<User />} />
                <Route path='users/new' element={<UserCreate />} />
                <Route path='users/:id/show' element={<UserDetail />} />
                <Route path='users/:id/edit' element={<UserUpdate />} />
                <Route path='orders' element={<Order />} />
                <Route path='orders/new' element={<OrderCreate />} />
                <Route path='orders/:id/show' element={<OrderDetail />} />
                <Route path='orders/:id/edit' element={<OrderUpdate />} />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
