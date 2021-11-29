import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import BookOverview from '../../components/book/BookOverview'
import Loading from '../../components/Loading'

const BookClubCurrenBook = ({
  bookclub,
  user,
  handleFetchBookClub,
  loading,
}) => {
  const [currentBook, setCurrentBook] = React.useState(null)

  React.useEffect(() => {
    setCurrentBook(
      bookclub
        ? bookclub.bookclub_books.find((book) => book.current === true)
        : []
    )
  }, [bookclub])

  // const handleRemoveBookFromWishlist = (bookClubBookId) => {
  //   setLoading(true)

  //   fetch(`/api/bookclub_books/${bookClubBookId}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify({
  //       archived: true,
  //     }),
  //   }).then((response) => {
  //     setLoading(false)
  //     if (response.ok) {
  //       filterOutBook(bookClubBookId)
  //       handleFetchBookClub(bookclub.id)
  //     }
  //   })
  // }

  return (
    <>
      {loading && <Loading />}
      {bookclub && (
        <Grid item container flexDirection='column' spacing={6}>
          <Grid item>
            <Typography
              component='h1'
              variant='h3'
              align='center'
              paddingTop
              paddingBottom>
              {bookclub.name} Book Club
            </Typography>
          </Grid>
          {!currentBook ? (
            <Grid item>
              <Typography
                component='p'
                variant='subtitle1'
                align='center'
                paddingTop>
                No Current Book
              </Typography>
            </Grid>
          ) : (
            <Grid item container flexDirection='column' spacing={6}>
              <Grid item>
                <BookOverview
                  book={currentBook.book}
                  status={currentBook.status}
                  isCurrentBook={currentBook.current}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  )
}

export default BookClubCurrenBook
