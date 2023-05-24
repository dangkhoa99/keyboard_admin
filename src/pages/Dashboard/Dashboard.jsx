import { useAuth } from '@/hooks/useAuth'
import { Box, Button } from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      {[...new Array(30)].map((item, index) => (
        <h1 key={index}>Dashboard Page {index + 1}</h1>
      ))}
    </Box>
  )
}

export default Dashboard
