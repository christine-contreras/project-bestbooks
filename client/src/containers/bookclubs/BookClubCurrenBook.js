import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import BookOverview from '../../components/book/BookOverview'
import Loading from '../../components/Loading'
import Goals from '../books/Goals'

const BookClubCurrenBook = ({
  bookclub,
  user,
  handleFetchBookClub,
  loading,
}) => {
  const [currentBook, setCurrentBook] = React.useState(null)
  const [goals, setGoals] = React.useState(null)

  React.useEffect(() => {
    const current = bookclub.bookclub_books.find(
      (book) => book.current === true
    )

    setCurrentBook(bookclub ? current : [])

    setGoals(bookclub ? current.goals : [])
  }, [bookclub])

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
              <Grid item>
                <Goals
                  isAdmin={user && user.id === bookclub.admin.id}
                  goals={goals}
                  setGoals={setGoals}
                  pagecount={currentBook.book.pages}
                  bookClubBookId={currentBook.id}
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
