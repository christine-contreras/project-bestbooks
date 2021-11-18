import * as React from 'react'
import theme from './theme/theme'
import './css/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'

import Layout from './containers/Layout'
import Home from './containers/Home'
import SignUpLogin from './containers/SignUpLogin'
import Profile from './containers/Profile'
import BookClubs from './containers/BookClubs'
import ProfileInfo from './containers/ProfileInfo'

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

  const HandleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) setUser(null)
    })
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box className='flex column'>
        <CssBaseline />
        <Router>
          <Layout user={user} onLogout={HandleLogout}>
            <Routes>
              <Route index path='/' element={<Home user={user} />} />

              <Route
                path='join-bestbooks'
                element={
                  <SignUpLogin
                    onLogin={setUser}
                    onLogout={HandleLogout}
                    user={user}
                  />
                }
              />

              <Route
                path='login'
                element={
                  <SignUpLogin
                    onLogin={setUser}
                    onLogout={HandleLogout}
                    user={user}
                  />
                }
              />

              <Route path='profile' element={<Profile user={user} />}>
                <Route path='my-bookclubs' element={<BookClubs />} />
                <Route path='my-info' element={<ProfileInfo />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
