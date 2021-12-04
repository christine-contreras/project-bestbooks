import React from 'react'
import { Typography, Modal, Grid } from '@mui/material'
import FormStatusChange from './FormStatusChange'

const BookStatusModal = ({
  openModal,
  handleCloseStatusModel,
  currentBook,
  setStatus,
  setCurrentBook,
  bookClubId,
  handleOpenSuccessDeleteMessage,
  handleFetchBookClub,
}) => {
  return (
    <Modal
      className='modal'
      open={openModal}
      onClose={handleCloseStatusModel}
      aria-labelledby='modal-delete-modal'
      aria-describedby='modal-delete-modal'>
      <Grid
        container
        flexDirection='column'
        className='modal-body b-radius-sm'
        spacing={2}>
        <Grid item>
          <Typography component='h1' variant='h4' align='center' paddingTop>
            Update Book Status
          </Typography>
        </Grid>

        <Grid item>
          <FormStatusChange
            setStatus={setStatus}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            bookClubId={bookClubId}
            handleOpenSuccessDeleteMessage={handleOpenSuccessDeleteMessage}
            handleFetchBookClub={handleFetchBookClub}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default BookStatusModal
