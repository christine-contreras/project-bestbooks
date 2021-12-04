import * as React from 'react'
import { Grid, Typography, Button, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WishlistBook from '../books/WishlistBook'

const BookClubWishlist = ({
  bookclub,
  user,
  handleFetchBookClub,
  setCurrentBook,
  setCurrentBookclub,
}) => {
  let navigate = useNavigate()
  const [wishListBooks, setWishListBooks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState(false)
  const handleOpenSuccessMessage = () => setSuccessMessage(true)
  const handleCloseSuccessMessage = () => setSuccessMessage(false)

  const [successDeleteMessage, setSuccessDeleteMessage] = React.useState(false)
  const handleOpenSuccessDeleteMessage = () => setSuccessDeleteMessage(true)
  const handleCloseSuccessDeleteMessage = () => setSuccessDeleteMessage(false)

  const access = !user ? false : bookclub.users.find((u) => u.id === user.id)

  React.useEffect(() => {
    setWishListBooks(
      bookclub
        ? bookclub.bookclub_books.filter(
            (book) => book.current === false && book.archived === false
          )
        : []
    )
  }, [bookclub])

  const handleRemoveBookFromWishlist = (bookClubBookId) => {
    setLoading(true)

    fetch(`/api/bookclub_books/${bookClubBookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        archived: true,
      }),
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

  const handleMakeCurrentBook = (bookClubBookId) => {
    setLoading(true)

    fetch(`/api/bookclubs/${bookclub.id}/current-book`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        new_bookclub_book_id: bookClubBookId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        filterOutBook(bookClubBookId)
        setCurrentBookclub(data)
        handleOpenSuccessMessage()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const filterOutBook = (bookClubBookId) => {
    const newWishlistBooks = wishListBooks.filter(
      (item) => item.id !== bookClubBookId
    )
    setWishListBooks(newWishlistBooks)
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
                loading={loading}
                BookclubBookId={item.id}
                handleRemoveBook={handleRemoveBookFromWishlist}
                handleMakeCurrentBook={handleMakeCurrentBook}
              />
            )
          })}
        </Grid>
      )}
      {access && (
        <Grid item textAlign='center'>
          <Button
            onClick={() => navigate('/search')}
            variant='contained'
            className='b-radius btn btn-lg'
            color='primary'>
            Add Book To Wishlist
          </Button>
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
          Book Successfully Moved To Currently Reading
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
          Book Successfully Archived
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default BookClubWishlist
