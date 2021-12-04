import * as React from 'react'
import BookLoading from '../../components/book/BookLoading'
import { Grid, Typography, Button } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import BookOverview from '../../components/book/BookOverview'

const WishlistBook = ({
  book,
  recommender,
  adminId,
  user,
  BookclubBookId,
  handleRemoveBook,
  handleMakeCurrentBook,
  loading,
}) => {
  const [isAdmin, setisAdmin] = React.useState(false)
  const [canArchive, setCanArchive] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setisAdmin(adminId === user.id)
      setCanArchive(user.full_name === recommender)
    }
  }, [user])

  return (
    <>
      {loading ? (
        <BookLoading />
      ) : (
        <Grid item container spacing={2} flexDirection='column' wrap='nowrap'>
          <Grid item container xs={12} lg={4} justifyContent='center'>
            <Typography component='p' variant='subtitle2' align='center'>
              Suggested By: {recommender}
            </Typography>
          </Grid>
          <Grid item>
            <BookOverview book={book} />
          </Grid>
          <Grid
            item
            container
            flexDirection='column'
            spacing={2}
            xs={12}
            lg={4}
            alignItems='center'>
            {user && isAdmin && (
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  className='btn b-radius'
                  startIcon={<BookmarkAddIcon />}
                  onClick={() => handleMakeCurrentBook(BookclubBookId)}>
                  Select For Book Club
                </Button>
              </Grid>
            )}
            {user && (isAdmin || canArchive) ? (
              <Grid item>
                <Button
                  variant='text'
                  className='b-radius btn'
                  color='error'
                  startIcon={<BeenhereIcon />}
                  onClick={() => handleRemoveBook(BookclubBookId)}>
                  Archive Book
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default WishlistBook
