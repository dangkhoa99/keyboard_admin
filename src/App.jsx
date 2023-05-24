import { MainLayout } from '@/common/layout/MainLayout'
import { PublicLayout } from '@/common/layout/PublicLayout'
import '@/common/styles/App.css'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Login from '@/pages/Login/Login'
import Product from '@/pages/Product/Product'
import { AuthProvider } from '@/provider/AuthProvider'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/' element={<MainLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='product' element={<Product />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
