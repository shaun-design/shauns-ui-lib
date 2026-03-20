/**
 * Demo app - blank slate.
 */

import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { createTheme } from '@/design-system/theme/createTheme'

function App() {
  const theme = createTheme('light')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#fff',
        }}
      />
    </ThemeProvider>
  )
}

export default App
