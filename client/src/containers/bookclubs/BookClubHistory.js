import * as React from 'react'
import { Grid, Typography, Snackbar, Alert } from '@mui/material'
import ArchivedBook from '../books/ArchivedBook'

const BookClubHistory = ({
  bookclub,
  user,
  handleFetchBookClub,
  setCurrentBookclub,
}) => {
  const [archivedBooks, setArchivedBooks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState(false)
  const handleOpenSuccessMessage = () => setSuccessMessage(true)
  const handleCloseSuccessMessage = () => setSuccessMessage(false)

  const [successDeleteMessage, setSuccessDeleteMessage] = React.useState(false)
  const handleOpenSuccessDeleteMessage = () => setSuccessDeleteMessage(true)
  const handleCloseSuccessDeleteMessage = () => setSuccessDeleteMessage(false)

  React.useEffect(() => {
    setArchivedBooks(
      bookclub
        ? bookclub.bookclub_books.filter((book) => book.archived === true)
        : []
    )
  }, [bookclub])

  const handleDeleteBook = (bookId, bookClubBookId) => {
    setLoading(true)

    fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    }).then((response) => {
      setLoading(false)
      if (response.ok) {
        filterOutBook(bookClubBookId)
        handleOpenSuccessDeleteMessage()
        setTimeout(() => {
          handleFetchBookClub(bookclub.id)
        }, 3000)
      }
    })
  }

  const handleMoveBookToWishlist = (bookClubBookId) => {
    setLoading(true)

    fetch(`/api/bookclub_books/${bookClubBookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        archived: false,
      }),
    }).then((response) => {
      setLoading(false)
      if (response.ok) {
        filterOutBook(bookClubBookId)
        handleOpenSuccessMessage()
        setTimeout(() => {
          handleFetchBookClub(bookclub.id)
        }, 2000)
      }
    })
  }

  const filterOutBook = (bookClubBookId) => {
    const newArchivedBooks = archivedBooks.filter(
      (item) => item.id !== bookClubBookId
    )
    setArchivedBooks(newArchivedBooks)
  }

  return (
    <Grid item container flexDirection='column' spacing={6}>
      <Grid item>
        <Typography
          component='h1'
          variant='h4'
          align='center'
          paddingTop
          paddingBottom>
          Archived Books
        </Typography>
      </Grid>
      {archivedBooks.length === 0 ? (
        <Grid item>
          <Typography
            component='p'
            variant='subtitle1'
            align='center'
            paddingTop>
            No Archived Books
          </Typography>
        </Grid>
      ) : (
        <Grid item container flexDirection='column' spacing={6}>
          {archivedBooks.map((item) => {
            return (
              <ArchivedBook
                key={`archived-bookitem-${item.id}`}
                book={item.book}
                status={item.status}
                adminId={bookclub.admin.id}
                user={user}
                loading={loading}
                bookClubBookId={item.id}
                handleDeleteBook={handleDeleteBook}
                handleMoveBookToWishlist={handleMoveBookToWishlist}
              />
            )
          })}
        </Grid>
      )}

      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}>
        <Alert
          variant='filled'
          onClose={handleCloseSuccessMessage}
          severity='success'
          sx={{ width: '100%' }}>
          Book Successfully Moved To Wishlist
        </Alert>
      </Snackbar>

      <Snackbar
        open={successDeleteMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessDeleteMessage}>
        <Alert
          variant='filled'
          onClose={handleCloseSuccessDeleteMessage}
          severity='info'
          sx={{ width: '100%' }}>
          Book Successfully Deleted
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default BookClubHistory
