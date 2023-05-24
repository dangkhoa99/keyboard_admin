import { createTheme } from '@mui/material/styles'
import { minHeight } from '@mui/system'

const renderTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: { main: '#0095ff' },
      secondary: { main: '#fe6b02' },
    },
    typography: { fontFamily: 'Roboto, Arial, san-serif' },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  })
}

export const lightTheme = renderTheme('light')
