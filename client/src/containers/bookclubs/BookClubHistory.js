import * as React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArchivedBook from '../books/ArchivedBook'

const BookClubHistory = ({ bookclub, user, handleFetchBookClub }) => {
  let navigate = useNavigate()
  const [archivedBooks, setArchivedBooks] = React.useState([])

  React.useEffect(() => {
    setArchivedBooks(
      bookclub
        ? bookclub.bookclub_books.filter((book) => book.archived === true)
        : []
    )
  }, [bookclub])

  const handleDeleteBook = (bookId, bookClubBookId) => {
    filterOutBook(bookClubBookId)

    fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        handleFetchBookClub(bookclub.id)
      }
    })
  }

  const handleMoveBookToWishlist = (bookClubBookId) => {
    filterOutBook(bookClubBookId)

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
      if (response.ok) {
        handleFetchBookClub(bookclub.id)
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
