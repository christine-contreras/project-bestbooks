import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import ArchivedBook from '../books/ArchivedBook'

const BookClubHistory = ({ bookclub, user, handleFetchBookClub }) => {
  const [archivedBooks, setArchivedBooks] = React.useState([])
  const [loading, setLoading] = React.useState(false)

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
        handleFetchBookClub(bookclub.id)
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
        handleFetchBookClub(bookclub.id)
      }
    })
  }

  const filterOutBook = (bookClubBookId) => {
    const newArchivedBooks = archivedBooks.filter(
      (item) => item.id !== bookClubBookId
    )

    debugger
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
    </Grid>
  )
}

export default BookClubHistory
