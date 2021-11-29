import * as React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ClearIcon from '@mui/icons-material/Clear'
import BookOverview from '../../components/book/BookOverview'
import DeleteModal from '../../components/form/DeleteModal'

const ArchivedBook = ({
  book,
  status,
  adminId,
  user,
  bookClubBookId,
  handleDeleteBook,
  handleMoveBookToWishlist,
}) => {
  //handle modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModel = () => setOpenModal(true)
  const handleCloseModel = () => setOpenModal(false)

  const handleDeleteFromModal = () => {
    handleDeleteBook(book.id, bookClubBookId)
  }

  return (
    <Grid item container spacing={2} flexDirection='column' wrap='nowrap'>
      <Grid item container xs={12} lg={4} justifyContent='center'>
        <Typography component='p' variant='subtitle2' align='center'>
          Status: {status}
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
        {adminId === user.id && (
          <>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                className='btn b-radius'
                startIcon={<StarIcon />}
                onClick={() => handleMoveBookToWishlist(bookClubBookId)}>
                Add To Wishlist
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='text'
                className='b-radius btn'
                color='error'
                startIcon={<ClearIcon />}
                onClick={handleOpenModel}>
                Delete Book
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      <DeleteModal
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        handleDelete={handleDeleteFromModal}
      />
    </Grid>
  )
}

export default ArchivedBook
