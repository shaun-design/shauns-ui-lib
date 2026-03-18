/**
 * App with theme and light/dark toggle.
 *
 * ThemeProvider: Wraps the app so MUI components get colors from tokens.
 * CssBaseline: Resets default browser styles for consistent look.
 */

import { useState } from 'react'
import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { createTheme } from '@/design-system/theme/createTheme'
import { Chip, Avatar } from '@/design-system/components'

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = createTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          p: 2,
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <h1 style={{ margin: 0, flex: 1 }}>shauns-ui-lib</h1>
          <IconButton
            onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
            aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            sx={{ color: 'text.primary' }}
          >
            {mode === 'light' ? (
              <MoonIcon style={{ width: 24, height: 24 }} />
            ) : (
              <SunIcon style={{ width: 24, height: 24 }} />
            )}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip label="Chip" />
          <Chip label="Primary" color="primary" />
          <Chip label="Avatar" thumbnail={<Avatar content="text" initials="OP" size="24px" />} />
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <p style={{ margin: 0 }}>
            Theme: {mode}. Colors and spacing come from tokens.
          </p>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
