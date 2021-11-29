import * as React from 'react'
import {
  Button,
  TextField,
  Alert,
  Stack,
  Modal,
  Grid,
  Typography,
} from '@mui/material'

const CreateBookclubModal = ({
  openModal,
  handleCloseModel,
  setBookClubs,
  fetchUser,
}) => {
  const [name, setName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)
    fetch('/api/bookclubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then((response) => {
      setLoading(false)
      if (response.ok) {
        response.json().then((bookclub) => {
          setBookClubs((prevBookClubs) => [...prevBookClubs, bookclub])
          fetchUser()
          handleCloseModel()
        })
      } else {
        response.json().then((err) => {
          setErrors(err.errors)
        })
      }
    })
  }

  return (
    <Modal
      className='modal'
      open={openModal}
      onClose={handleCloseModel}
      aria-labelledby='modal-create-bookclub-modal'
      aria-describedby='modal-create-bookclub-modal'>
      <Grid
        container
        flexDirection='column'
        className='modal-body b-radius-sm'
        spacing={2}>
        <Grid item>
          <Typography
            component='h1'
            variant='h4'
            align='center'
            paddingTop
            paddingBottom>
            Create A New Book Club
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit} className='form'>
          <TextField
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            label='Name'
            variant='outlined'
            fullWidth
          />

          <Button
            type='submit'
            variant='contained'
            className='b-radius btn btn-lg'
            color='primary'>
            Create Book Club
          </Button>

          <Stack sx={{ width: '100%' }} spacing={2} className='padding-top'>
            {errors.map((error) => (
              <Alert severity='error' key={error}>
                {error}
              </Alert>
            ))}
            {loading && (
              <Alert severity='info'>
                Creating Book Club... Do Not Refresh Page
              </Alert>
            )}
          </Stack>
        </form>
      </Grid>
    </Modal>
  )
}

export default CreateBookclubModal
