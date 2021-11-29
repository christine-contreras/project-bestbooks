import React from 'react'
import { Typography, Modal, Grid, Button } from '@mui/material'
import FormAddToWishlist from './FormAddToWishlist'
import { useNavigate } from 'react-router-dom'

const AddToWishlistModal = ({
  openModal,
  handleCloseModel,
  bookclubs,
  book,
}) => {
  let navigate = useNavigate()
  return (
    <Modal
      className='modal'
      open={openModal}
      onClose={handleCloseModel}
      aria-labelledby='modal-delete-modal'
      aria-describedby='modal-delete-modal'>
      <Grid
        container
        flexDirection='column'
        className='modal-body b-radius-sm'
        spacing={2}>
        <Grid item>
          <Typography component='h1' variant='h4' align='center' paddingTop>
            Add To Wishlist
          </Typography>
        </Grid>

        {bookclubs && bookclubs.length !== 0 ? (
          <>
            <Grid item>
              <FormAddToWishlist bookclubs={bookclubs} book={book} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item textAlign='center'>
              <Typography
                component='p'
                variant='subtitle1'
                align='center'
                paddingTop>
                You don't have any book clubs right now
              </Typography>
            </Grid>
            <Grid item textAlign='center'>
              <Button
                onClick={() => navigate('/profile/my-bookclubs')}
                variant='contained'
                className='b-radius btn btn-lg'
                color='primary'>
                Start A New Book Club
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Modal>
  )
}

export default AddToWishlistModal
