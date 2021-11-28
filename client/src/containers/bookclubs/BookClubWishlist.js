import * as React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WishlistBook from '../books/WishlistBook'

const BookClubWishlist = ({ bookclub, loading, user }) => {
  let navigate = useNavigate()
  //   const [wishListBooks, setWishListBooks] = React.useState(
  //     bookclub ? bookclub.book_books.filter((book) => book.wishlist === true) : []
  //   )
  const [wishListBooks, setWishListBooks] = React.useState([])

  React.useEffect(() => {
    setWishListBooks(
      bookclub
        ? bookclub.bookclub_books.filter((book) => book.wishlist === true)
        : []
    )
  }, [bookclub])

  return (
    <Grid item container flexDirection='column' spacing={6}>
      <Grid item>
        <Typography
          component='h1'
          variant='h4'
          align='center'
          paddingTop
          paddingBottom>
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
        <Grid item container flexDirection='column' spacing={6}>
          {wishListBooks.map((item) => {
            return (
              <WishlistBook
                key={`wishlist-bookitem-${item.id}`}
                book={item.book}
                recommender={item.suggested_by}
                status={item.status}
                adminId={bookclub.admin.id}
                user={user}
                id={item.id}
              />
            )
          })}
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
    </Grid>
  )
}

export default BookClubWishlist
