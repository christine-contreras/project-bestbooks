import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import theme from './theme/theme'
import './css/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Box from '@mui/material/Box'
import Layout from './containers/Layout'
import Home from './containers/Home'
import SignUpLogin from './containers/SignUpLogin'
import Profile from './containers/Profile'
import BookClubs from './containers/BookClubs'
import ProfileInfo from './containers/ProfileInfo'
import Search from './containers/Search'
import BookPage from './containers/BookPage'
import BookInfo from './containers/BookInfo'

//dummy data
import { data } from './helpers/booksrec'
import { bookinfo } from './helpers/bookinfo'
const apiKey = process.env.REACT_APP_API_BOOKS

function App() {
  const appliedTheme = createTheme(theme)
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [bookResults, setBookResults] = React.useState(null)
  const [currentbook, setCurrentBook] = React.useState(null)
  const [recommendationLists, setRecommendationLists] = React.useState(null)
  const [currentList, setCurrentList] = React.useState(null)

  React.useEffect(() => {
    // auto-login
    handleCheckLogin()

    //fetch list recommendations
    handleFetchRecommendations()
  }, [])

  const handleCheckLogin = () => {
    fetch('/api/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
      } else {
        response.json().then((err) => console.log(err))
      }
    })
  }

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) setUser(null)
    })
  }

  const handleFetchRecommendations = () => {
    // fetch('https://goodreads-books.p.rapidapi.com/lists?page=1', {
    //   method: 'GET',
    //   headers: {
    //     'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
    //     'x-rapidapi-key': apiKey,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setRecommendationLists(data)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })

    //fake data
    setRecommendationLists(data)
  }

  const handleListSearch = (listId) => {
    setLoading(true)

    fetch(`https://goodreads-books.p.rapidapi.com/lists/${listId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentList({
          id: listId,
          list: data,
        })
        setLoading(false)
        setBookResults(null)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleBookSearch = (searchPhrase) => {
    setLoading(true)
    fetch(
      `https://goodreads-books.p.rapidapi.com/search?q=${searchPhrase}&page=1`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBookResults(data)
        setLoading(false)
        setCurrentList(null)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleFetchBook = (bookId) => {
    setCurrentBook(null)
    setLoading(true)
    fetch(`https://goodreads-books.p.rapidapi.com/books/${bookId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentBook(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
    // setCurrentBook(bookinfo)
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box className='flex column'>
        <CssBaseline />
        <Router>
          <Layout user={user} onLogout={handleLogout}>
            <Routes>
              <Route
                index
                path='/'
                element={
                  <Home
                    user={user}
                    handleListSearch={handleListSearch}
                    recommendationLists={recommendationLists}
                  />
                }
              />

              <Route
                path='join-bestbooks'
                element={
                  <SignUpLogin
                    onLogin={setUser}
                    onLogout={handleLogout}
                    user={user}
                  />
                }
              />

              <Route
                path='login'
                element={
                  <SignUpLogin
                    onLogin={setUser}
                    onLogout={handleLogout}
                    user={user}
                  />
                }
              />

              <Route path='profile' element={<Profile user={user} />}>
                <Route path='my-bookclubs' element={<BookClubs />} />
                <Route path='my-info' element={<ProfileInfo />} />
              </Route>

              <Route
                path='search'
                element={
                  <Search
                    recommendationLists={recommendationLists}
                    currentList={currentList}
                    handleListSearch={handleListSearch}
                    bookResults={bookResults}
                    handleBookSearch={handleBookSearch}
                    handleFetchBook={handleFetchBook}
                    loading={loading}
                  />
                }></Route>

              <Route path='book' element={<BookPage />}>
                <Route
                  path=':id'
                  element={<BookInfo book={currentbook} loading={loading} />}
                />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
