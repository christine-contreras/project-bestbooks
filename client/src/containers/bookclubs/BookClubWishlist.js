import * as React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BookClubWishlist = ({ bookclub, loading, user }) => {
  let navigate = useNavigate()
  const [wishListBooks, setWishListBooks] = React.useState(
    bookclub ? bookclub.books.filter((book) => book.wishlist === true) : []
  )

  React.useEffect(() => {
    setWishListBooks(
      bookclub ? bookclub.books.filter((book) => book.wishlist === true) : []
    )
  }, [bookclub])

  return (
    <>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>
          Book Wish List
        </Typography>
      </Grid>
      {wishListBooks.length === 0 ? (
        <Grid item>
          <Typography
            component='p'
            variant='subtitle1'
            align='center'
            paddingTop>
            No Books In Wishlist
          </Typography>
        </Grid>
      ) : (
        <Grid item>
          <Typography
            component='p'
            variant='subtitle1'
            align='center'
            paddingTop>
            Books In Wishlist
          </Typography>
        </Grid>
      )}
      <Grid item textAlign='center'>
        <Button
          onClick={() => navigate('/search')}
          variant='contained'
          className='b-radius btn btn-lg'
          color='primary'>
          Add Book To Wishlist
        </Button>
      </Grid>
    </>
  )
}

export default BookClubWishlist
