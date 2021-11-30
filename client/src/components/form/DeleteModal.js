import * as React from 'react'
import { Typography, Modal, Alert, Grid, Button } from '@mui/material'

const DeleteModal = ({
  openModal,
  handleCloseModel,
  handleDelete,
  item,
  warningMessage,
}) => {
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
            Delete {item}
          </Typography>
        </Grid>
        <Grid item>
          <Alert severity='error'>{warningMessage}</Alert>
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
