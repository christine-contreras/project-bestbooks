import * as React from 'react'
import theme from './theme/theme'
import './css/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'

import Home from './containers/Home'
import Layout from './containers/Layout'

function App() {
  const appliedTheme = createTheme(theme)

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box className='flex column'>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
