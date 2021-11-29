import * as React from 'react'
import { Typography, Modal, Alert, Grid, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

const DeleteModal = ({ openModal, handleCloseModel, handleDelete }) => {
  let location = useLocation()

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
            Delete {location.pathname.includes('/my-info') && 'Profile'}
            {location.pathname.includes('/admin-dashboard') && 'Book Club'}
            {location.pathname.includes('/history') && 'Book'}
          </Typography>
        </Grid>
        <Grid item>
          <Alert severity='error'>
            Are you sure you want to delete{' '}
            {location.pathname.includes('/my-info') && 'your profile?'}
            {location.pathname.includes('/admin-dashboard') &&
              'your book club?'}
            {location.pathname.includes('/history') &&
              'this book? All book information will be deleted (including goals, guide questions, and comments)'}
          </Alert>
        </Grid>
        <Grid item textAlign='center'>
          <Button
            variant='outlined'
            className='b-radius btn btn-lg'
            color='error'
            onClick={handleDelete}>
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
