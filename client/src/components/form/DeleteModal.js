import React from 'react'
import { Typography, Modal, Alert, Grid, Button } from '@mui/material'

const DeleteModal = ({ openModal, handleCloseModel, handleDeleteProfile }) => {
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
            Delete Profile
          </Typography>
        </Grid>
        <Grid item>
          <Alert severity='error'>
            Are you sure you want to delete your profile?
          </Alert>
        </Grid>
        <Grid item textAlign='center'>
          <Button
            variant='outlined'
            className='b-radius btn btn-lg'
            color='error'
            onClick={handleDeleteProfile}>
            Yes, I'm Sure
          </Button>
        </Grid>
        <Grid item textAlign='center'>
          <Button
            variant='contained'
            className='b-radius btn btn-lg'
            color='primary'
            onClick={handleCloseModel}>
            Exit
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default DeleteModal
