import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './theme/theme'
import './css/App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

import Layout from './containers/Layout'
import Home from './containers/home/Home'
import SignUpLogin from './containers/SignUpLogin'
import Profile from './containers/profile/Profile'
import BookClubs from './containers/profile/BookClubs'
import ProfileInfo from './containers/profile/ProfileInfo'
import Search from './containers/search/Search'
import BookPage from './containers/books/BookPage'
import BookInfo from './containers/books/BookInfo'
import BookClubPage from './containers/bookclubs/BookClubPage'
import BookClub from './containers/bookclubs/BookClub'
import BookClubDashboard from './containers/bookclubs/BookClubDashboard'
import BookClubCurrenBook from './containers/bookclubs/BookClubCurrenBook'
import BookClubWishlist from './containers/bookclubs/BookClubWishlist'
import BookClubHistory from './containers/bookclubs/BookClubHistory'

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
  const [currentBookclub, setCurrentBookclub] = React.useState(null)

  React.useEffect(() => {
    // auto-login
    handleCheckLogin()

    //fetch list recommendations
    handleFetchRecommendations()
  }, [])

  const handleCheckLogin = () => {
    fetch('/api/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user)
        })
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
    fetch('https://goodreads-books.p.rapidapi.com/lists?page=1', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendationLists(data)
      })
      .catch((err) => {
        console.error(err)
      })

    //fake data
    // setRecommendationLists(data)
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

  const handleFetchBookClub = (bookClubId) => {
    setCurrentBookclub(null)
    setLoading(true)
    fetch(`/api/bookclubs/${bookClubId}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setCurrentBookclub(data)
      })
      .catch((err) => {
        console.error(err)
      })
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
                <Route
                  path='my-bookclubs'
                  element={
                    <BookClubs user={user} fetchUser={handleCheckLogin} />
                  }
                />
                <Route
                  path='my-info'
                  element={
                    <ProfileInfo
                      user={user}
                      onLogout={handleLogout}
                      setUser={setUser}
                      handleCheckLogin={handleCheckLogin}
                    />
                  }
                />
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

              {/* still need to make functionality of adding book to book club */}
              <Route path='book' element={<BookPage />}>
                <Route
                  path=':id'
                  element={
                    <BookInfo
                      book={currentbook}
                      handleFetchBook={handleFetchBook}
                      loading={loading}
                      user={user}
                    />
                  }
                />
              </Route>

              <Route path='bookclub' element={<BookClubPage />}>
                <Route
                  path=':id'
                  element={
                    <BookClub
                      user={user}
                      loading={loading}
                      bookclub={currentBookclub}
                      handleFetchBookClub={handleFetchBookClub}
                    />
                  }>
                  <Route
                    path='admin-dashboard'
                    element={
                      <BookClubDashboard
                        bookclub={currentBookclub}
                        setCurrentBookclub={setCurrentBookclub}
                        fetchUser={handleCheckLogin}
                        user={user}
                      />
                    }
                  />
                  <Route
                    path='current-book'
                    element={
                      <BookClubCurrenBook
                        bookclub={currentBookclub}
                        user={user}
                        loading={loading}
                        handleFetchBookClub={handleFetchBookClub}
                      />
                    }
                  />
                  <Route
                    path='wishlist'
                    element={
                      <BookClubWishlist
                        bookclub={currentBookclub}
                        user={user}
                        setCurrentBookclub={setCurrentBookclub}
                        setCurrentBook={setCurrentBook}
                        handleFetchBookClub={handleFetchBookClub}
                      />
                    }
                  />
                  <Route
                    path='history'
                    element={
                      <BookClubHistory
                        bookclub={currentBookclub}
                        user={user}
                        setCurrentBookclub={setCurrentBookclub}
                        handleFetchBookClub={handleFetchBookClub}
                      />
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
