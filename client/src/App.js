import * as React from 'react'
import theme from './theme/theme'
import './css/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'

import Layout from './containers/Layout'
import Home from './containers/Home'
import SignUp from './containers/SignUp'

function App() {
  const appliedTheme = createTheme(theme)

  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    // auto-login
    fetch('/api/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
      } else {
        response.json().then((err) => console.log(err))
      }
    })
  }, [])

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box className='flex column'>
        <CssBaseline />
        <Router>
          <Layout user={user}>
            <Routes>
              <Route index path='/' element={<Home user={user} />} />

              <Route
                path='join-bestbooks'
                element={<SignUp onLogin={setUser} />}
              />
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
