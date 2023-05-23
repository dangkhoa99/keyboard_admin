import { MainLayout } from '@/common/layout/MainLayout'
import '@/common/styles/App.css'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Login from '@/pages/Login/Login'
import { AuthProvider } from '@/provider/AuthProvider'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
