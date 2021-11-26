import React from 'react'
import { Typography, Modal, Alert, Grid, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

const DeleteModal = ({
  openModal,
  handleCloseModel,
  handleDeleteProfile,
  handleDeleteBookclub,
}) => {
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
            Delete{' '}
            {location.pathname.includes('/my-info') ? 'Profile' : 'Book Club'}
          </Typography>
        </Grid>
        <Grid item>
          <Alert severity='error'>
            Are you sure you want to delete your{' '}
            {location.pathname.includes('/my-info') ? 'profile' : 'book club'}?
          </Alert>
        </Grid>
        <Grid item textAlign='center'>
          <Button
            variant='outlined'
            className='b-radius btn btn-lg'
            color='error'
            onClick={
              location.pathname.includes('/my-info')
                ? handleDeleteProfile
                : handleDeleteBookclub
            }>
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
